
// var express = require('express');
// var io = require('socket.io'), // include socket.io package
// app = express(), // make an instance of express.js module
// server = app.listen(ServerPort), // start a server on the port
// socketServer = io(server); // create a socket server using the express server 
// //initialise serial port initialization



// // listener for all static file requests
// socketServer.on('connection', openSocket);
// // listener for websocket data


// function serveFiles(request, response) {
//     var fileName = request.params.name;
//     // get the file name from the request
//     response.sendFile(fileName);  // send the file
//     //res.sendFile('d:/sp/'+fileName , { root : __dirname});
// }

// function openSocket(socket) {
//     console.log('new user address: ' + socket.handshake.address);
//     // send something to the web client with the data:
//     socket.emit('message', 'Server listening on address : ' + socket.handshake.address);
//     // this function runs if there's input from the client:

//     // this function runs if there's input from the serialport:
//     serialport.on('data', function (data) {
//         console.log(data);
//         socket.emit('message', data); // send the data to the client
//     })
// };

var BaudRate = 9600;
var ServerPort = 8080;

const { SerialPort } = require('serialport')
const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()
const server = http.createServer(app)
const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
}) //in case server and client run on different urls

const serialport = new SerialPort({
    path: process.argv[2],
    baudRate: BaudRate,
})

// Open errors will be emitted as an error event
serialport.on('error', function(err) {
    console.log('Error: ', err.message)
  })


io.on('connection',(socket)=>{
  console.log(`client connected: ${socket.id}`)
  
  socket.join('buttons-room')
  
  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
})

serialport.on('data', function (data) {
    let buttonPressed = data.toString();
    console.log(buttonPressed);
    io.to('buttons-room').emit('button', buttonPressed)
})

server.listen(PORT, err=> {
  if(err) console.log(err)
  console.log('Server running on Port ', PORT)
})