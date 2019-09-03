const mqtt = require('mqtt');
const rpio = require('rpio');

const client = mqtt.connect('mqtt://localhost:1883');

client.subscribe('casa/campainha');

client.on('message', (topic, message) => {
  const msg = message.toString();
  if(msg === 'open'){
      console.log('Enviar um', msg);
      sign(4);
      console.log('Enviar um', msg);
  }
})

function sign(pin) {
  rpio.open(pin, rpio.OUTPUT, rpio.LOW);
  rpio.write(12, rpio.HIGH);
  rpio.sleep(1);

  /* Off for half a second (500ms) */
  rpio.write(12, rpio.LOW);
  rpio.msleep(500);
}
