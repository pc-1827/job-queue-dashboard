const fetchJobs = require('./fetchJobData');

async function channelSubscribe(redisSubscriber, io, redisClient) {
    const channels = ['waiting', 'active', 'failed', 'completed', 'delayed'];
    const clientSelectedQueues = new Map();

    channels.forEach(channel => {
        redisSubscriber.subscribe(channel, async () => {
            try {
                const jobMap = await fetchJobs(redisClient, channel);

                // Send the job data to the clients who have selected this queue
                io.sockets.sockets.forEach((socket) => {
                    if (clientSelectedQueues.get(socket.id) === channel) {
                        socket.emit(channel, jobMap);
                    }
                });
            } catch (error) {
                console.error(`Error fetching ${channel} jobs:`, error);
            }
        });
    });

    io.on('connection', (socket) => {
        //console.log('New client connected');

        socket.on('selectQueue', (queueType) => {
            clientSelectedQueues.set(socket.id, queueType);
        });

        socket.on('disconnect', () => {
            //console.log('Client disconnected');
            clientSelectedQueues.delete(socket.id);
        });
    });

    console.log('Subscribed to channels successfully.');
}

module.exports = channelSubscribe;
