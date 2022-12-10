var BaudRate = 9600;
var ServerPort = 8080;
const { exec } = require('child_process');

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

app.get('/', (req, res) => {

  const command = 'gphoto2 --capture-image-and-download';
  exec(command, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
     // the *entire* stdout and stderr (buffered)
     console.log(`stdout: ${stdout}`);
     console.log(`stderr: ${stderr}`);

     res.send(stdout)
    }
  });
})