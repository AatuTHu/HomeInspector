#include <WiFi.h>
#include <DHT.h>
#include <HTTPClient.h>
#include <ESPAsyncWebServer.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

#include "CREDENTIALS.h"
#define ledPin 5
#define DHTPIN 0
#define DHTTYPE DHT22
DHT dht(DHTPIN,DHTTYPE);

AsyncWebServer server(80);

Adafruit_PCD8544 display = Adafruit_PCD8544(23, 22, 17, 19, 18);
int contrastValue = 200; // Default Contrast Value

//Variables
float hum;  //Stores humidity value
float temp; //Stores temperature value
const char* temperature = "temperature";
const char* humidity = "humidity";
const char* start = "start";
const char* tempUnit = "celsius";
const char* humUnit = "%";

int enableMeasurementsTemperature = 0;
int enableMeasurementsHumidity = 0; 
int enableLights = 0;

unsigned long previousMillis = 0;
unsigned long interval = 10000;

void makeHttpPOSTRequestToServer(const char* URL,const char* KEY, float VALUE) {
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
} else {
 Serial.print("Error on HTTP request. HTTP Response code: ");
 Serial.println(httpResponseCode);
}
 http.end();
}


void setup() {
Serial.begin(115200);
pinMode(ledPin, OUTPUT);

WiFi.begin(ssid, password);
while (WiFi.status() != WL_CONNECTED) {
Serial.print("..");
}
Serial.println("Connected to WiFi");
Serial.println(WiFi.localIP());


server.on("/ledON", HTTP_GET, [](AsyncWebServerRequest *request){
 enableLights = 1;
request->send(200, "text/plain", "LED is ON");

display.clearDisplay();
display.setTextColor(BLACK, WHITE);
display.setTextSize(1);
display.setCursor(0, 0);
display.println("LED is ON");
display.display();
});

server.on("/ledOFF", HTTP_GET, [](AsyncWebServerRequest *request){
 enableLights = 0;
request->send(200, "text/plain", "LED is OFF");

display.clearDisplay();
display.setTextColor(BLACK, WHITE);
display.setTextSize(1);
display.setCursor(0, 0);
display.println("LED is OFF");
display.display();
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
  display.println("LED is ON");
}
display.display();
}

void onlyOneMeasurementON(const char* KEY, float VALUE, const char* UNIT) {
display.clearDisplay();
display.setTextColor(BLACK, WHITE);
display.setTextSize(1);
display.setCursor(0, 1);
display.println(KEY);
display.print(VALUE);
display.print(" ");
display.println(UNIT);
if(enableLights == 1) {
  display.println("LED is ON");
}
display.display();
}

void noMeasurementsON() {
display.clearDisplay();
display.setTextColor(BLACK, WHITE);
display.setTextSize(1);
display.setCursor(1,1);
display.println("Temperature");
display.println("and");
display.println("humidity");
display.println("are off");
display.println("");
if(enableLights == 1) {
  display.println("LED is ON");
}
display.display();
}

void loop() {
 unsigned long currentMillis = millis();

if(currentMillis - previousMillis > interval) {

if(enableMeasurementsTemperature == 1) { // user can enable measurements from phone.
temp= dht.readTemperature();
Serial.println("Temperature");
Serial.print(temp);
Serial.println(" Celsius");
makeHttpPOSTRequestToServer(temperatureURL, temperature, temp);
}

if(enableMeasurementsHumidity == 1) { // user can enable measurements from phone.
 hum = dht.readHumidity();
 Serial.println("Humidity: ");
 Serial.print(hum);
 Serial.println(" %");
 makeHttpPOSTRequestToServer(humidityURL, humidity, hum);
}
 previousMillis = currentMillis;
}

if(enableMeasurementsHumidity == 1 && enableMeasurementsTemperature == 1) {
bothMeasurementsON();
} else if (enableMeasurementsHumidity == 1 ) {
onlyOneMeasurementON(humidity, hum, humUnit);
} else if(enableMeasurementsTemperature == 1) {
onlyOneMeasurementON(temperature, temp, tempUnit);
} else if(enableMeasurementsTemperature == 0 && enableMeasurementsHumidity == 0) {
noMeasurementsON();
}

if(enableLights == 1) {
digitalWrite(ledPin, HIGH);
} else if (enableLights == 0) {
digitalWrite(ledPin, LOW);
}}
