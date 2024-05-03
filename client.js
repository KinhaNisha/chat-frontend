const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const sound = new Audio('sound.mp3')


const appendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const playSound = () => {
    sound.play();
}

const Username = prompt("Enter your name to join chat");

// Emit event when a new user joins
socket.emit('new-user-joined', Username);

// Listen for new user joined event
socket.on('user-joined', data => {
    appendMessage(`${data} joined the chat`, 'right');
    playSound();
});

// Listen for receive message event
socket.on('receive-message', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
    playSound();
});

// Send message when form is submitted
form.addEventListener('submit', event => {
    event.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send-message', message);
    messageInput.value = '';
});
