from gpiozero import LED
from time import sleep

campainha = LED(4)

s = 1
while s:
    campainha.on()
    sleep(1)
    s = 0

print('$$ Python open')