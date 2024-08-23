const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const redisConnection = require('./redisConnection');
const fetchJobs = require('./fetchJobData');
const channelSubscribe = require('./channelSubscribe');

dotenv.config();

const { PORT } = process.env;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', async (socket) => {
    console.log('New client connected');

    const redisClient = await redisConnection();
    const redisSubscriber = await redisConnection();

    socket.on('fetchJobs', async (queueType) => {
        const jobMap = await fetchJobs(redisClient, queueType);
        socket.emit(queueType, jobMap);
    });

    socket.on('selectQueue', (queueType) => {
        socket.emit('selectQueue', queueType);
    });

    socket.on('flushAll', async () => {
        await redisClient.flushAll();
        const emptyJobs = [];
        const channels = ['waiting', 'active', 'failed', 'completed', 'delayed'];
        channels.forEach(channel => {
            io.emit(channel, emptyJobs);
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    channelSubscribe(redisSubscriber, io, redisClient);
});

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
