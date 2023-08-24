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
    io.emit('chat message',`${username} has joined the chat.`);

    if(users.indexOf(username) === -1){
      users.push(username);
      socket.username = username;
      io.emit('update userList', users);
      console.log(users);
    }
  });
  console.log('A user connected');
  
 

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', (username) => {
    console.log(users.indexOf(socket.username));
    const indexOfUser = users.indexOf(socket.username);
    if(indexOfUser >= 0){
      users.splice(indexOfUser,1);
      console.log('A user disconnected');
      console.log(users);
      io.emit("user removed", socket.username);
    }
    
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
