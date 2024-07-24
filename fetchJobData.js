const dotenv = require('dotenv');
const redisConnection = require('./redisConnection');

dotenv.config();

const { QUEUE_NAME } = process.env;

async function fetchJobs(redisClient, queueType) {
    try {
        const jobMap = [];
        let jobIds = [];
        if (queueType === 'waiting'){
            jobIds = await redisClient.zRange(`jobQueue:${QUEUE_NAME}:${queueType}`, 0, -1);
        }
        else{
            jobIds = await redisClient.lRange(`jobQueue:${QUEUE_NAME}:${queueType}`, 0, -1);
        }
        for (const jobId of jobIds) {
            const jobData = await fetchJobData(redisClient, jobId);
            jobMap.push({ jobId, jobData });
        }
        return jobMap;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
}

async function fetchJobData(redisClient, jobId) {
    const jobData = await redisClient.hGetAll(`jobQueue:${QUEUE_NAME}:${jobId}`);
    if (Object.keys(jobData).length === 0) {
        return null;
    }

    // Parse the jobData correctly
    const parsedJobData = {};
    for (const [key, value] of Object.entries(jobData)) {
        try {
            parsedJobData[key] = JSON.parse(value);
        } catch (error) {
            parsedJobData[key] = value; // If JSON.parse fails, store the raw value
        }
    }
    return parsedJobData;
}

module.exports = fetchJobs;
