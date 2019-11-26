from gpiozero import LED
from time import sleep

led = LED(4)

s = 1;

while s:
    led.on()
    sleep(1)
    s = 0;
