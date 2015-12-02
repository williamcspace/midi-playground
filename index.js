var launchpadpro = require('./launchpadpro');
var _ = require('lodash');
var midi = require('midi');

var input = new midi.input();
var output = new midi.output();

// Count the available input ports.
var count = input.getPortCount();
console.log('Port Count: ' + count);

// Get the name of a specified input port.
for (var i = 0; i < count; i++){
  var name = input.getPortName(i);
  console.log('Port Name ' + i + ': ' + name);
}

// Configure a callback.
input.on('message', function(deltaTime, message) {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
  // information interpreting the messages.
  console.log('message:' + message + ' deltaTime:' + deltaTime);

  switch(message[1]){
    case 11:
      if (message[2] === 127){
        output.sendMessage([144, 81, 45]);
        output.sendMessage([144, 71, 45]);
        output.sendMessage([144, 61, 45]);
      }else if(message[2] === 0){
        output.sendMessage([144, 81, 0]);
        output.sendMessage([144, 71, 0]);
        output.sendMessage([144, 61, 0]);
      }
      break;
    case 12:
      if (message[2] === 127){
        output.sendMessage([144, 83, 69]);
        output.sendMessage([144, 73, 69]);
        output.sendMessage([144, 63, 69]);
        output.sendMessage([144, 64, 69]);
      }else if(message[2] === 0){
        output.sendMessage([144, 83, 0]);
        output.sendMessage([144, 73, 0]);
        output.sendMessage([144, 63, 0]);
        output.sendMessage([144, 64, 0]);
      }
      break;
    case 13:
      if (message[2] === 127){
        output.sendMessage([144, 86, 5]);
        output.sendMessage([144, 76, 5]);
        output.sendMessage([144, 66, 5]);
        output.sendMessage([144, 67, 5]);
        output.sendMessage([144, 68, 5]);
        output.sendMessage([144, 78, 5]);
        output.sendMessage([144, 88, 5]);
      }else if(message[2] === 0){
        output.sendMessage([144, 86, 0]);
        output.sendMessage([144, 76, 0]);
        output.sendMessage([144, 66, 0]);
        output.sendMessage([144, 67, 0]);
        output.sendMessage([144, 68, 0]);
        output.sendMessage([144, 78, 0]);
        output.sendMessage([144, 88, 0]);
      }
      break;
  }
});

// Open the first available input port.
input.openPort(2);
output.openPort(2);

// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// For example if you want to receive only MIDI Clock beats
// you should use
// input.ignoreTypes(true, false, true)
input.ignoreTypes(false, false, false);

// ... receive MIDI messages ...

// Close the port when done.
//input.closePort();
//output.closePort();