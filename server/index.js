const throttle = require('lodash/throttle');
const dgram = require('dgram');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const constants = require('./utils/constants').default

const drone = dgram.createSocket('udp4');
const droneState = dgram.createSocket('udp4');

drone.bind(constants.DRONE_COMMANDS_PORT);
droneState.bind(constants.DRONE_STATUS_PORT);

io.on('connection', socket => {

  console.log('connected')
  socket.on('command', command => drone.send(command, 0, command.length, constants.DRONE_COMMANDS_PORT, constants.DRONE_HOST, () => {}))
})

http.listen(constants.SERVER_PORT, function(){
  console.log(`Listening on *:${constants.SERVER_PORT}`);
});

setInterval(() => {
  io.sockets.emit('message', Math.random());
}, constants.HEART_BEET_INTERVAL)

drone.on('message', message => {
  console.log(`🤖 : ${message}`);
  io.sockets.emit('drone_command_status', message.toString());
});


droneState.on(
  'message',
  throttle(state => {
    console.log(state.toString())
    io.sockets.emit('drone_state', state.toString());
  }, 1000)
);

// init commands
drone.send('command', 0, 'command'.length, constants.DRONE_COMMANDS_PORT, constants.DRONE_HOST, () => {});


// io.sockets.on('command', (command) => {
//   console.log(command)
//   drone.send(command, 0, command.length, constants.DRONE_COMMANDS_PORT, constants.DRONE_HOST, () => {})
// })