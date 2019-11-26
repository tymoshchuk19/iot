const mqtt = require('mqtt');
const { mqtt:connectadr } = require('../config/env')
const exec = require('child_process').exec;

const client = mqtt.connect(connectadr);
client.subscribe('casa/campainha');

client.on('message', (topic, message) => {
  const msg = message.toString();
  if(msg === 'open'){
      console.log('Enviar um', msg);
      exec('python config/open.py',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
      });
  }
})

module.exports.open = () => client.publish('casa/campainha', 'open');

