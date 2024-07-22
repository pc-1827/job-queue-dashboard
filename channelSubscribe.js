const redisConnection = require('./redisConnection');

channelSubscribe();

async function channelSubscribe() {
    try {
        const redisClient = await redisConnection();

        // Subscribe to the 'waiting' channel
        redisClient.subscribe('waiting', (message) => {
            console.log('Waiting message:', message);
        });

        // Subscribe to the 'active' channel
        redisClient.subscribe('active', (message) => {
            console.log('Active message:', message);
        });

        // Subscribe to the 'failed' channel
        redisClient.subscribe('failed', (message) => {
            console.log('Failed message:', message);
        });

        // Subscribe to the 'completed' channel
        redisClient.subscribe('completed', (message) => {
            console.log('Completed message:', message);
        });

        // Subscribe to the 'delayed' channel
        redisClient.subscribe('delayed', (message) => {
            console.log('Delayed message:', message);
        });

        console.log('Subscribed to channels successfully.');
    } catch (error) {
        console.error('Error connecting to Redis or subscribing to channel:', error);
    }
}
