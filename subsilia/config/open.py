from gpiozero import LED
from time import sleep

campainha = LED(4)

campainha.on()

print('$$ Python open')