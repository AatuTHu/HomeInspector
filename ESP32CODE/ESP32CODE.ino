#include <WiFi.h>
#include <DHT.h>
#include <HTTPClient.h>
#include "CREDENTIALS.h"

#define DHTPIN 0
#define DHTTYPE DHT22
DHT dht(DHTPIN,DHTTYPE);
WiFiServer server(80);

//Variables
String header;
float hum;  //Stores humidity value
float temp; //Stores temperature value
const char* temperature = "temperature";
const char* humidity = "humidity";
int enableMeasurementsTemperature = 0;
int enableMeasurementsHumidity = 0; 
int enableLights = 0;


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

void handleStartRequestFromServer(WiFiClient client) {
  String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        header += c;
        if (c == '\n') {
          if (currentLine.length() == 0) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

           if (header.indexOf("GET /startHumidity") >= 0) { 
              Serial.println('Starting humidity');
              if(enableMeasurementsHumidity == 0) {
                enableMeasurementsHumidity = 1;
                delay(500);
              } else {
                enableMeasurementsHumidity = 0;
              }   
           }

             if (header.indexOf("GET /startTemperature") >= 0) { 
              Serial.println('Starting temperature');
              if(enableMeasurementsTemperature == 0) {
                enableMeasurementsTemperature = 1;
                delay(500);
              } else {
                enableMeasurementsTemperature = 0;
              }   
           }

             if (header.indexOf("GET /lights") >= 0) { 
              Serial.println('lights on/of');
              if(enableLights == 0) {
                enableLights = 1;
                delay(500);
              } else {
                enableLights = 0;
              }   
           }
            client.println();
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }
    // Clear the header variable
    header = "";
    // Close the connection
    client.stop();
    Serial.println("Client disconnected.");
    Serial.println("");
}

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
   
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());;

    dht.begin();
    server.begin();
}

void loop() {
  WiFiClient client = server.available();   // Listen for incoming clients

  if (client) {
    handleStartRequestFromServer(client);
  }

  if(enableMeasurementsTemperature == 1) { // user can enable measurements from phone.
    Serial.println("Temperature");
    Serial.print(temp);
    Serial.println(" Celsius");
    temp= dht.readTemperature();
    makeHttpRequestToServer(temperatureURL, temperature, temp);
  }
  if(enableMeasurementsHumidity == 1) { // user can enable measurements from phone.
    Serial.println("Humidity: ");
    Serial.print(hum);
    Serial.println(" %");
    hum = dht.readHumidity();
    makeHttpRequestToServer(humidityURL, humidity, hum);
  }
  
  // Wait for a few seconds before the next loop
  delay(500);
}
