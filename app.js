import mqtt from 'mqtt';
import rpi433 from 'rpi-433';

console.log('Starting...');

const rfSniffer = rpi433.sniffer({
  pin: 1,
  debounceDelay: 100
});

const rfEmitter = rpi433.emitter({
  pin: 0,
  pulseLength: 500
});

// Connection to MQTT
console.log('Connecting to MQTT');
const mqttClient = mqtt.connect('mqtt://localhost');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT');

  // Subscribe to topic 433
  mqttClient.subscribe('433');
});


// When receiving a code from RF
rfSniffer.on('data', (data) => {
  console.log(`Receive code ${data.code} from RF`);

  // Send the code to MQTT
  mqttClient.publish('433', 'receive:' + data.code.toString());
});


// Receive a message from MQTT
mqttClient.on('message', (topic, message) => {
  message = message.toString();
  console.log(`Receive message on topic ${topic}: ${message}`);

  if (topic !== '433' || !/^send:/.test(message)) {
    return false;
  }

  const code = message.replace(/^send:/, '');
  console.log(`Receive code from MQTT: ${code}`);

  // Send the message to RF
  rfEmitter.sendCode(code, (err, message) => {
    if (err) {
      console.error('Error when sending code to RF');
      return false;
    }
    console.log('Code has been succesfully sent to RF');
  });
});
