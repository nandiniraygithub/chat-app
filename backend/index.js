const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const authRouter = require('./routes/AuthRouter');

// Import your database connection (ensure this path is correct)
require('./Models/db'); // Adjust based on your directory structure

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Track online users with their socket IDs
const onlineUsers = new Map();

// Function to update the user list and broadcast it
const updateUserList = () => {
    io.emit("userList", Array.from(onlineUsers.values()));
};

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining
    socket.on("join", (name) => {
        onlineUsers.set(socket.id, name);
        console.log(`${name} has joined the chat.`);

        // Welcome message to everyone
        io.emit("message", { type: "system", text: `${name} has joined the chat` });
        updateUserList();
    });

    // Handle sending messages
    socket.on("sendMessage", (data) => {
        const senderName = onlineUsers.get(socket.id);
        if (senderName) {
            const messageData = { from: senderName, text: data.text, timestamp: new Date().toISOString() };

            // Broadcast message to everyone
            io.emit("message", messageData);
        } else {
            console.error("User not found.");
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        const name = onlineUsers.get(socket.id);
        if (name) {
            onlineUsers.delete(socket.id);
            console.log(`${name} has left the chat.`);
            io.emit("message", { type: "system", text: `${name} has left the chat` });
            updateUserList();
        }
    });
});

// Set up server to listen on the specified port
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
