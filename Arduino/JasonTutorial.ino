/****************************************
 * Include Libraries
 ****************************************/
#include "UbidotsESPMQTT.h"

/****************************************
 * Define Constants
 ****************************************/
#define TOKEN "" //Replace the empty string with your Ubidots TOKEN
#define WIFINAME "" //Replace the empty string with your ssid, eg: "MyHomeNewtwork"
#define WIFIPASS "" //Replace the empty string with your wi-fi password, eg: "mypass123456"
#define MQTTCLIENTNAME ""//Replace with any random string, Ubidots requires it to be unique


Ubidots client(TOKEN, MQTTCLIENTNAME);

/****************************************
 * Auxiliar Functions
 ****************************************/

//NOTE PINS ARE FROM THE INTERNAL ESP8266 MODULE NOT THE DIGITAL PINS FROM THE NODEMCU, MORE AT INFO: http://www.electronicwings.com/nodemcu/nodemcu-gpio-with-arduino-ide
int outputs[] = {2,4,5,12};
int inputs[] = {13,14,15,16};
int btnStates[] = {0,0,0,0};

//This is called every time we receive an update from the Ubidots server
void callback(char* topic, byte* payload, unsigned int length) {
  //Print the topic (pin) and its server state
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
  bool reading = true;
  int count = 20;
  String topicPin = "";
  String payloadState = "";
  Serial.println(" ");
  while(reading){
    if((char)topic[count] != '/'){
      topicPin += (char)topic[count];
      Serial.print((char)topic[count]);
      count++;
    }
    else{
       Serial.println(" STRING: " + topicPin);
      reading = false;
    }
  }
  for (int i = 0; i < length; i++) {
    payloadState += (char)payload[i];
    Serial.print((char)payload[i]);
  }
  //Apply server value to pin
  int ledpin = topicPin.toInt();
  int state = payloadState.toInt();
  digitalWrite(ledpin, state);
  Serial.println();
}

/****************************************
 * Main Functions
 ****************************************/

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  client.wifiConnection(WIFINAME, WIFIPASS);
  client.begin(callback);
  //Subscribe to all of out Outputs pins
  for(int i=0;i<4;i++){
    char b[2];
    String str;
    str=String(outputs[i]);
    str.toCharArray(b,2);
    client.ubidotsSubscribe("esp32",b); //Insert the dataSource and Variable's Labels
  }
  //Set all of our pinModes and save button states
  for(int i = 0; i<4; i++){
    pinMode(outputs[i], OUTPUT);
    pinMode(inputs[i], INPUT);
    int buttonState = digitalRead(inputs[i]);
    btnStates[i] = buttonState;
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if(!client.connected()){
      client.reconnect();
      //Subscribe to all of out Outputs pins
      for(int i=0;i<4;i++){
        char b[2];
        String str;
        str=String(outputs[i]);
        str.toCharArray(b,2);
        client.ubidotsSubscribe("esp32",b); //Insert the dataSource and Variable's Labels
      }
  }
  //Check if switch has changed state
  //If it did chnage, change the light state and save it to array
  for(int i = 0; i<4; i++){
    int buttonState = digitalRead(inputs[i]);
    if(buttonState != btnStates[i]){
      digitalWrite(outputs[i], buttonState);
      btnStates[i] = buttonState;
    }
  }
  client.loop();
}
