

const socket = io.connect();

const emojis = {
    "react": "⚛️",
    "woah": "😯",
    "hey": "🖐️",
    "lol": "😂",
    "like": "❤️",
    "congratulations": "🎉"
};

const commands = {
    "/" : "Available commands are /help /clear /greet",
    "/help": "List of available commands: /help, /emoji, /greet",
    "/clear": "Clear all messages",
    "/greet": "Hello! How can I help you?"
};

const username = prompt('Enter your username:');
if (username.trim() !== '') {
    socket.emit('user joined', username);
}

socket.on("update userList", (users) => {
    
    
    users.forEach((user) => {
        const sideBar = document.querySelector('.sidebar');
        const li = document.createElement('li');
        li.textContent = user;
        li.classList.add('members');
        sideBar.appendChild(li);

    });
});

function sendMessage(){
    const input = document.querySelector('#message-input');
    const message = input.value;
    if (message.trim() !== '') {
        if (message.startsWith('/')) {
            handleCommand(message);
          } else {
            socket.emit('chat message', message);
          }
        input.value = '';
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        sendMessage();
    }
});



socket.on('chat message', (msg) => {
    const modifiedMsg = replaceEmojis(msg);
    const messages = document.querySelector('.chat-messages');
    const newMessageDiv = document.createElement('div');
    document.getElementById('message-input').value = "";
    const li = document.createElement('li');
    li.textContent = modifiedMsg;
    
    if (msg.sentByUser) {
        li.classList.add('sent-message');
    } else {
        li.classList.add('received-message');
    }
    
    messages.appendChild(li);

    });

function replaceEmojis(text) {
    if(!text.startsWith(":")){
        Object.keys(emojis).forEach((emojiKey) => {
            const emojiValue = emojis[emojiKey];
            const emojiRegExp = new RegExp(emojiKey, 'gi');
            text = text.replace(emojiRegExp, emojiValue);
        });
    }
    
    return text;
}

function handleCommand(command) {
    const response = commands[command.toLowerCase()] || "Command not recognized.";
    const messages = document.querySelector('.chat-messages');
    const li = document.createElement('li');
    li.textContent = response;
    li.style.fontStyle = 'italic';
    li.style.color = '#888';
    messages.appendChild(li);
  }