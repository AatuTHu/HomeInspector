#include <WiFi.h>
#include <DHT.h>
#include "CREDENTIALS.h"

#define DHTPIN 0
#define DHTTYPE DHT22
DHT dht(DHTPIN,DHTTYPE);

//Variables
float hum;  //Stores humidity value
float temp; //Stores temperature value


void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(250);
        Serial.print(".");
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
    delay(5000); //Delay 5 sec.

}
