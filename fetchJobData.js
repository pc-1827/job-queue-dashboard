const dotenv = require('dotenv');
const redisConnection = require('./redisConnection');

dotenv.config();

const { QUEUE_NAME } = process.env;

(async () => {
    try {
        const redisClient = await redisConnection();
        const jobMap = await fetchJobs(redisClient, 'failed');
        console.log(jobMap);
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
})();

async function fetchJobs(redisClient, queueType) {
    try {
        const jobMap = [];
        const jobIds = await redisClient.lRange(`jobQueue:${QUEUE_NAME}:${queueType}`, 0, -1);

        // Use Promise.all to wait for all jobData fetches to complete
        const jobDetails = await Promise.all(jobIds.map(async (jobId) => {
            const jobData = await fetchJobData(redisClient, jobId);
            return { jobId, jobData };
        }));

        return jobDetails;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
}

async function fetchJobData(redisClient, jobId) {
    try {
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
    } catch (error) {
        console.error(`Error fetching job data for job ${jobId}:`, error);
        return null;
    }
}
