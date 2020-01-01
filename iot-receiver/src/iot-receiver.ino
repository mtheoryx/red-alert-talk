int led = D7;

int setAlert(String level);

void setup()
{

  Particle.function("alert", setAlert);

  pinMode(led, OUTPUT);
  Serial1.begin(9600);
  //Wait up to 10 seconds
  waitFor(Serial.isConnected, 10000);
  Serial1.println("Hello World!");
}

/*
    A function takes a param of "level"
    That then calls a serial1 print line with
    A matching level
    And clears it after 5 minutes
*/

int alertLevel = 0;

int setAlert(String level)
{
  switch (atoi(level))
  {
  case 1:
    alertLevel = 1;
    break;
  case 2:
    alertLevel = 2;
    break;
  default:
    alertLevel = 0;
    break;
  }
  return 0;
}

void loop()
{
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);

  switch (alertLevel)
  {
  case 0:
    Serial1.println("ALERT:RESET");
    break;
  case 1:
    Serial1.println("ALERT:LOW");
    break;
  case 2:
    Serial1.println("ALERT:HIGH");
    break;
  default:
    break;
  }
  delay(500);
  return;
}
