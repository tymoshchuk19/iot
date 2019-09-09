const mqtt = require('mqtt');
const exec = require('child_process').exec;

const client = mqtt.connect('mqtt://localhost:1883');

client.subscribe('casa/campainha');

client.on('message', (topic, message) => {
  const msg = message.toString();
  if(msg === 'open'){
      console.log('Enviar um', msg);
      exec('python open.py',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
      });
  }
})

