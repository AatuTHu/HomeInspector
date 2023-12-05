#include <WiFi.h>
#include <DHT.h>
#include <HTTPClient.h>
#include <ESPAsyncWebServer.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

#include "CREDENTIALS.h"
#define ledPin 5
#define buttonLedPin 14
#define buttonTempPin 27
#define buttonHumPin 26
#define DHTPIN 0
#define DHTTYPE DHT22
DHT dht(DHTPIN,DHTTYPE);

AsyncWebServer server(80);

Adafruit_PCD8544 display = Adafruit_PCD8544(23, 22, 17, 19, 18);


//Variables
float hum;  //Stores humidity value
float temp; //Stores temperature value
int contrastValue = 150;

const char* temperature = "temperature";
const char* humidity = "humidity";
const char* measuringMode = "measuringMode";
const char* lightMode = "lightMode";
const char* tempUnit = "celsius";
const char* humUnit = "%";

int serverState = 1;
int tempButtonState = LOW;
int lastTempButtonState = LOW;
int humButtonState = LOW;
int lastHumButtonState = LOW;
int buttonLedState = LOW;
int lastButtonLedState = LOW;
int enableMeasurementsTemperature = 0;
int enableMeasurementsHumidity = 0; 
int enableLights = 0;

unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;
unsigned long previousMillis = 0;
unsigned long interval = 10000;

void setup() {
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  pinMode(buttonLedPin,INPUT);
  pinMode(buttonTempPin, INPUT);
  pinMode(buttonHumPin, INPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
  }
  Serial.println("");
  Serial.println(WiFi.localIP());


  server.on("/ledON", HTTP_GET, [](AsyncWebServerRequest *request){
  enableLights = 1;
  request->send(200, "text/plain", "LED is ON");
  });

  server.on("/ledOFF", HTTP_GET, [](AsyncWebServerRequest *request){
  enableLights = 0;
  request->send(200, "text/plain", "LED is OFF");
  });

  server.on("/tempON", HTTP_GET, [](AsyncWebServerRequest *request){
  enableMeasurementsTemperature = 1;
  request->send(200, "text/plain", "Temperature is ON");
  });

  server.on("/tempOFF", HTTP_GET, [](AsyncWebServerRequest *request){
  enableMeasurementsTemperature = 0;
  request->send(200, "text/plain", "Temperature is OFF");
  });

  server.on("/humON", HTTP_GET, [](AsyncWebServerRequest *request){
  enableMeasurementsHumidity = 1;
  request->send(200, "text/plain", "Humidity is ON");
  });

  server.on("/humOFF", HTTP_GET, [](AsyncWebServerRequest *request){
  enableMeasurementsHumidity = 0;
  request->send(200, "text/plain", "Humidity is OFF");
  });

  server.begin();
  dht.begin();
  display.begin();

  display.setContrast(contrastValue);
  display.clearDisplay();
  display.display();
}

void sendReadingToServer(const char* URL,const char* KEY, float VALUE) {
  HTTPClient http;
  // Specify the server endpoint and request method
  http.begin(URL);
  http.addHeader("Content-Type", "application/json");
  // Your JSON payload
  String jsonPayload = "{\""+ String(KEY) +"\":" + String(VALUE) + ", \"apiKey\":\"" + String(apiKey) + "\"}";
  // Send the POST request
  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
  String response = http.getString();
  Serial.println(response);
  serverState = 1;
  } else {
  Serial.print("Error on HTTP request. HTTP Response code: ");
  Serial.println(httpResponseCode);
  enableMeasurementsTemperature = 0;
  enableMeasurementsHumidity = 0;
  serverState = 0;
  httpERROR();
  }
  http.end();
}

int sendStartValueToServer(const char* URL, const char* KEY, int VALUE) {
   HTTPClient http;
  // Specify the server endpoint and request method
  http.begin(URL);
  http.addHeader("Content-Type", "application/json");
  // Your JSON payload
  String jsonPayload = "{\""+ String(KEY) +"\":" + String(VALUE) + ", \"apiKey\":\"" + String(apiKey) + "\"}";
  // Send the POST request
  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
  String response = http.getString();
  Serial.println(response);
  serverState = 1;
  } else {
  Serial.print("Error on HTTP request. HTTP Response code: ");
  Serial.println(httpResponseCode);
  enableMeasurementsTemperature = 0;
  enableMeasurementsHumidity = 0;
  serverState = 0;
  httpERROR();
  }

  http.end();

  return httpResponseCode;
}



void startScreen() {
  display.clearDisplay();
  display.setTextColor(BLACK, WHITE);
  display.setCursor(0,0);
  display.setTextSize(0.5);
  display.println("HOMEINSPECTOR ONLINE");
  display.display();
}


void bothMeasurementsON() {    
  display.clearDisplay();
  display.setTextColor(BLACK, WHITE);
  display.setTextSize(1);
  display.setCursor(0,1);
  display.println("Temperature");
  display.print(temp);
  display.println(" Celsius");
  display.println("");
  display.println("Humidity");
  display.print(hum);
  display.println(" %");
  if(enableLights == 1) {
  display.println("Led is on");
  } else {
  display.println("Led is off");
  }
  display.display();
}

void onlyOneMeasurementON(const char* KEY, float VALUE, const char* UNIT) {
  display.clearDisplay();
  display.setTextColor(BLACK, WHITE);
  display.setTextSize(1);
  display.setCursor(0,1);
  display.println(KEY);
  display.print(VALUE);
  display.print(" ");
  display.println(UNIT);
  if(enableLights == 1) {
  display.println("Led is on");
  } else {
  display.println("Led is off");
  }
  display.display();
}

void noMeasurementsON() {
  display.clearDisplay();
  display.setTextColor(BLACK, WHITE);
  display.setTextSize(1);
  display.setCursor(1,1);
  display.println("Temperature: ");
  display.println("off");
  display.println("humidity: ");
  display.println("off");
  display.println("");
  if(enableLights == 1) {
  display.println("Led is on");
  } else {
  display.println("Led is off");
  }
  display.display();
}

void httpERROR() {
  display.clearDisplay();
  display.setTextColor(BLACK, WHITE);
  display.setTextSize(1);
  display.setCursor(1,1);
  display.println("SERVICE");
  display.println("UNAVAILABLE");
  display.display();
}

void loop() {
  unsigned long currentMillis = millis();
  int ledReading = digitalRead(buttonLedPin);
  int tempReading = digitalRead(buttonTempPin);
  int humReading = digitalRead(buttonHumPin);


  
  //LED BUTTON

  if (ledReading != lastButtonLedState) {
    lastDebounceTime = millis();
  }
  if ((millis() - lastDebounceTime) > debounceDelay) {
   if (ledReading != buttonLedState) {
      buttonLedState = ledReading;
      if (buttonLedState == HIGH) {    
        int response = sendStartValueToServer(lightURL, lightMode, enableLights);
        if(response > 0) {
          enableLights = 1 - enableLights;
        }
      }
    }
  }

  lastButtonLedState = ledReading;

  //TEMPERATURE BUTTON
  if (tempReading != lastTempButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (tempReading != tempButtonState) {
      tempButtonState = tempReading;
      if (tempButtonState == HIGH) {       
        int response = sendStartValueToServer(temperatureStartURL, measuringMode, enableMeasurementsTemperature);
        if(response > 0) {
          enableMeasurementsTemperature = 1 - enableMeasurementsTemperature;
        }
      }
    }
  }

  lastTempButtonState = tempReading;

  //HUMIDITY BUTTON
  if (humReading != lastHumButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (humReading != humButtonState) {
      humButtonState = humReading;
      if (humButtonState == HIGH) {       
        int response = sendStartValueToServer(humidityStartURL, measuringMode, enableMeasurementsHumidity);
         if(response > 0) {
          enableMeasurementsHumidity = 1 - enableMeasurementsHumidity;
        }
      }
    }
  }

  lastHumButtonState = humReading;

  //READING POSTS
  if(currentMillis - previousMillis > interval) {
    if(enableMeasurementsTemperature == 1) { // user can enable measurements from phone.
    temp = dht.readTemperature();
    sendReadingToServer(temperatureURL, temperature, temp);
    }
    if(enableMeasurementsHumidity == 1) { // user can enable measurements from phone.
    hum = dht.readHumidity();
    sendReadingToServer(humidityURL, humidity, hum);
    }
    previousMillis = currentMillis;
  }


   if(enableMeasurementsHumidity == 1 && enableMeasurementsTemperature == 1) {
    bothMeasurementsON();
  } else if (enableMeasurementsHumidity == 1 && serverState == 1) {
    onlyOneMeasurementON(humidity, hum, humUnit);
  } else if(enableMeasurementsTemperature == 1 && serverState == 1) {
    onlyOneMeasurementON(temperature, temp, tempUnit);
  } else if(enableMeasurementsTemperature == 0 && enableMeasurementsHumidity == 0 && serverState == 1) {
    noMeasurementsON();
  }

  if(enableLights == 1) {
    digitalWrite(ledPin, HIGH);
  } else if (enableLights == 0) {
    digitalWrite(ledPin, LOW);
 }
}
