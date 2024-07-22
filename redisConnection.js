const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

async function redisConnection() {
    try {
        const redisUrl = `redis://${REDIS_PASSWORD ? ':' + REDIS_PASSWORD + '@' : ''}${REDIS_HOST}:${REDIS_PORT}`;
        const redisClient = redis.createClient({ url: redisUrl });
        await redisClient.connect();
        console.log('Connected to Redis with password.');
        return redisClient;
    } catch (error) {
        console.error('Failed to connect to Redis with password, trying without password...');
        try {
            const redisUrl = `redis://${REDIS_HOST}:${REDIS_PORT}`;
            const redisClient = redis.createClient({ url: redisUrl });
            await redisClient.connect();
            console.log('Connected to Redis without password.');
            return redisClient;
        } catch (error) {
            throw new Error('Failed to connect to Redis without password.');
        }
    }
}

module.exports = redisConnection;
