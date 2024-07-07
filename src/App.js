import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <ul>
          <li>Waiting</li>
          <li>Active</li>
          <li>Completed</li>
          <li>Failed</li>
          <li>Delayed</li>
        </ul>
      </nav>
      <div className="job-details-box">
        <h2>Burger#10</h2>
        <div className="job-details-content">
          <div className="job-meta">
            <p><strong>Added at:</strong> 6:20:22 PM</p>
            <p><strong>Process started at:</strong> 6:20:26 PM</p>
            <p><strong>Failed at:</strong> 6:20:34 PM</p>
          </div>
          <div className="job-data-section">
            <div className="job-details-navbar">
              <ul>
                <li>Data</li>
                <li>Options</li>
              </ul>
            </div>
            <pre className="job-data">
              {`
              {
                "jobData": {
                  "bun": "🍔",
                  "cheese": "🧀",
                  "toppings": [
                    "🥬",
                    "🍅",
                    "🥒",
                    "🌶️"
                  ]
                },
                "returnValue": null
              }
              `}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
