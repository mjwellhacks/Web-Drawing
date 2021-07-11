#include "LedControl.h"
LedControl lc=LedControl(12,10,11,1);
int i = 0;
void setup() {
  lc.shutdown(0,false);
  lc.setIntensity(0,8);
  lc.clearDisplay(0);
  Serial.begin(9600);
}
void splitanddo(String tosplit){
  Serial.println(tosplit);
  Serial.println(tosplit.length());
  String temphold = "";
  char delim = ',';
  for (int i = 0; i < tosplit.length(); i++){
    Serial.println(tosplit[i]);
    if (tosplit[i] != delim){
      temphold += tosplit[i];
    }
    else {
      parserow(temphold);
      Serial.println(temphold);
      temphold = "";
    }
  }
}
void clearrow(int rownumber){
  for (int i=0; i < 8; i++) {
    lc.setLed(0,i,rownumber,false);
  }
}
void parserow(String row){
  int rownumberchar = row[0];
  int rownumber = rownumberchar - '0';
  clearrow(rownumber);
  row.remove(0, 1);
  for (int i=0; i<row.length(); i++) {
     int charint = row[i] - '0';
     if (charint == 1){
        lc.setLed(0, 7 - i, rownumber,true);
     }
     else{
        lc.setLed(0, 7 - i, rownumber,false);
     }
  }
}
void loop() {
  if (Serial.available()){
    Serial.println("in");
    String data = Serial.readString();
    Serial.println(data);
    splitanddo(data);
  }
}
