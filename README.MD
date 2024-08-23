# Job Queue Dashboard

**Job Queue Dashboard** is a UI for monitoring jobs handled by the [distributed-job-queue](https://github.com/pc-1827/distributed-job-queue). It provides a comprehensive view of all the jobs being processed, offering real-time updates on job status. The dashboard is built upon a Redis server and leverages Pub/Sub, Socket.IO, and an Express server to run smoothly.

## Features

- **Queues Monitored**: The dashboard allows you to monitor the following queues:
  - **Waiting**: Jobs that are in the queue, waiting to be processed.
  - **Active**: Jobs that are currently being processed.
  - **Completed**: Jobs that have been successfully processed.
  - **Failed**: Jobs that have failed during processing.
  - **Delayed**: Jobs that are scheduled to be processed at a later time.

- **Delete All Button**: A "Delete All" button is available to clear all the jobs in the Redis server, providing a quick way to manage and reset your job queues.

## Getting Started

![image of job-queue-dashboard](https://github.com/pc-1827/job-queue-dashboard/blob/master/img/image.png?raw=true)

### Installation

To use the Job Queue Dashboard, follow these steps:

1. **Clone the Repository**

   Clone the `job-queue-dashboard` repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/job-queue-dashboard.git
   cd job-queue-dashboard
   ```

2. **Configure Environment Variables**

   Create a `.env` file by copying the `.env.example` file provided in the repository:
   ```bash
   cp .env.example .env
   ```
   The `.env` file contains important configuration settings for the Job Queue Dashboard. Below is an explanation of each variable in the `.env.example` file:

   - **REDIS_HOST**: The hostname of your Redis server. By default, this is set to `127.0.0.1`, which points to the local machine.
   - **REDIS_PORT**: The port number on which your Redis server is running. The default Redis port is `6379`.
   - **REDIS_PASSWORD**: The password for your Redis server. If your Redis server requires a password, set it here. If not, leave it blank.
   - **PORT**: The port on which the Job Queue Dashboard will run. The default is `3000`, so the dashboard will be accessible at `http://localhost:3000`.
   - **QUEUE_NAME**: The name of the queue you want to monitor with the dashboard. This should match the name of the queue used in your `distributed-job-queue` setup. For example, if your queue is named `myFirstQueue`, set this variable to `myFirstQueue`.

3. **Install Dependencies**

   Install the required dependencies using npm:
   ```bash
   npm install
   ```
4. **Start the Dashboard**

   Start the Express server to run the Job Queue Dashboard:
   ```bash
   npm start
   ```
