const socket = io();

document.querySelectorAll('.navbar li').forEach((navItem) => {
    navItem.addEventListener('click', (event) => {
        const queueType = event.target.getAttribute('data-queue');
        socket.emit('fetchJobs', queueType);
    });
});

socket.on('waiting', (jobs) => updateJobs('Waiting', jobs));
socket.on('active', (jobs) => updateJobs('Active', jobs));
socket.on('completed', (jobs) => updateJobs('Completed', jobs));
socket.on('failed', (jobs) => updateJobs('Failed', jobs));
socket.on('delayed', (jobs) => updateJobs('Delayed', jobs));

function updateJobs(queueType, jobs) {
    const jobDetailsBox = document.querySelector('.job-details-box .job-details-content');
    jobDetailsBox.innerHTML = ''; // Clear previous job details

    if (jobs.length === 0) {
        jobDetailsBox.innerHTML = `<p>No jobs in ${queueType} queue.</p>`;
        return;
    }

    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job-element');

        const formattedCreatedOn = new Date(job.jobData.createdOn).toLocaleString();
        const formattedProcessedOn = job.jobData.processedOn ? new Date(job.jobData.processedOn).toLocaleString() : 'N/A';
        const formattedCompletedOn = job.jobData.completedOn ? new Date(job.jobData.completedOn).toLocaleString() : 'N/A';
        const status = job.jobData.status || 'N/A';

        jobElement.innerHTML = `
            <div class="job-meta">
                <p><strong>Job ID:</strong> ${job.jobId}</p>
                <p><strong>Status:</strong> ${status}</p>
                <p><strong>Created on:</strong> ${formattedCreatedOn}</p>
                <p><strong>Processed on:</strong> ${formattedProcessedOn}</p>
                <p><strong>Completed on:</strong> ${formattedCompletedOn}</p>
            </div>
            <div class="job-data-section">
                <div class="job-details-navbar">
                    <ul>
                        <li class="data-tab active" data-content="data">Data</li>
                        <li class="options-tab" data-content="options">Options</li>
                    </ul>
                </div>
                <pre class="job-data">${JSON.stringify(job.jobData.data, null, 2)}</pre>
            </div>
        `;

        const dataTab = jobElement.querySelector('.data-tab');
        const optionsTab = jobElement.querySelector('.options-tab');
        const jobData = jobElement.querySelector('.job-data');

        dataTab.addEventListener('click', () => {
            dataTab.classList.add('active');
            optionsTab.classList.remove('active');
            jobData.textContent = JSON.stringify(job.jobData.data, null, 2);
        });

        optionsTab.addEventListener('click', () => {
            optionsTab.classList.add('active');
            dataTab.classList.remove('active');
            jobData.textContent = JSON.stringify(job.jobData.jobOptions, null, 2);
        });

        jobDetailsBox.appendChild(jobElement);
    });
}
