const socket = io();

document.querySelectorAll('.navbar li').forEach((navItem) => {
    navItem.addEventListener('click', (event) => {
        const queueType = event.target.innerText.toLowerCase();
        socket.emit('fetchJobs', queueType);
    });
});

socket.on('waiting', (jobs) => updateJobs('waiting', jobs));
socket.on('active', (jobs) => updateJobs('active', jobs));
socket.on('completed', (jobs) => updateJobs('completed', jobs));
socket.on('failed', (jobs) => updateJobs('failed', jobs));
socket.on('delayed', (jobs) => updateJobs('delayed', jobs));

function updateJobs(queueType, jobs) {
    const jobDetailsBox = document.querySelector('.job-details-box');
    jobDetailsBox.innerHTML = '';

    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job-details-content');
        jobElement.innerHTML = `
            <h2>Job ID: ${job.jobId}</h2>
            <pre>${JSON.stringify(job.jobData, null, 2)}</pre>
        `;
        jobDetailsBox.appendChild(jobElement);
    });
}
