const mqtt = require('mqtt');
const exec = require('child_process').exec;

const client = mqtt.connect('mqtt://192.168.1.127:1883');

client.subscribe('casa/campainha');

client.on('message', (topic, message) => {
  const msg = message.toString();
  if(msg === 'open'){
      console.log('Enviar um', msg);
      exec('python3.7 open.py',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
      });
  }
})

module.exports = {
    opendoor: () => {
        client.publish('casa/campainha', 'open');
    }

}

