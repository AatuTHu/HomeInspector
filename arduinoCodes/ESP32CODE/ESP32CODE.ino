#include <WiFi.h>
#include <DHT.h>
#include <HTTPClient.h>
#include "CREDENTIALS.h"

#define DHTPIN 0
#define DHTTYPE DHT22
DHT dht(DHTPIN,DHTTYPE);

//Variables
float hum;  //Stores humidity value
float temp; //Stores temperature value
const char* temperature = "temperature";
const char* humidity = "humidity";


void makeHttpRequestToServer(const char* URL,const char* KEY, float VALUE) {
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
    Serial.println("Waiting");
    delay(5000);
}

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    dht.begin();
}

void loop() {

    //Read data and store it to variables hum and temp
    hum = dht.readHumidity();
    temp= dht.readTemperature();
    //Print temp and humidity values to serial monitor
    Serial.print("Humidity: ");
    Serial.print(hum);
    Serial.print(" %, Temp: ");
    Serial.print(temp);
    Serial.println(" Celsius");

    
  makeHttpRequestToServer(temperatureURL, temperature, temp);
  makeHttpRequestToServer(humidityURL, humidity, hum);
  
  // Wait for a few seconds before the next loop
  delay(50000);
}
