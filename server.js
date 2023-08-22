const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const users = [];
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  socket.on('user joined', (username) => {
    // Store the username in the socket object
    socket.username = username;
    
    // Broadcast a system message indicating that a user has joined
    io.emit('chat message', {
      text: `${username} has joined the chat.`,
      system: true
    });

    if(users.indexOf(username) === -1){
      users.push(username);
      socket.username = username;
      io.emit('update userList', users);
      console.log(users);
    }
  });
  console.log('A user connected');
  
 

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
