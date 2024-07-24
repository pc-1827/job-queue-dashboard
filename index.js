const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const redisConnection = require('./redisConnection');
const fetchJobs = require('./fetchJobData');
const channelSubscribe = require('./channelSubscribe');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', async (socket) => {
    //console.log('New client connected');

    const redisClient = await redisConnection();
    const redisSubscriber = await redisConnection();

    socket.on('fetchJobs', async (queueType) => {
        const jobMap = await fetchJobs(redisClient, queueType);
        socket.emit(queueType, jobMap);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    channelSubscribe(redisSubscriber, io, redisClient);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
