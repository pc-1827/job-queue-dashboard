const fetchJobs = require('./fetchJobData');

async function channelSubscribe(redisSubscriber, io, redisClient) {
    const channels = ['waiting', 'active', 'failed', 'completed', 'delayed'];

    channels.forEach(channel => {
        redisSubscriber.subscribe(channel, async (message) => {
            //console.log(`${channel} message:`, message);

            try {
                const jobMap = await fetchJobs(redisClient, channel);
                //console.log(`Fetched ${channel} jobs:`, jobMap);

                // Send the job data to the client side
                io.emit(channel, jobMap);
            } catch (error) {
                console.error(`Error fetching ${channel} jobs:`, error);
            }
        });
    });

    console.log('Subscribed to channels successfully.');
}

module.exports = channelSubscribe;
