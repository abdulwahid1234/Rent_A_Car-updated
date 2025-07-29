import React from 'react';
import './Statistics.css';

const StatisticsPage = () => {
  return (
    <div className="statistics-container">
      <h2>Dashboard Statistics</h2>

      <div className="stats-cards">
        <div className="stat-card blue">
          <h4>Total Cars</h4>
          <p>35</p>
        </div>
        <div className="stat-card green">
          <h4>Total Drivers</h4>
          <p>18</p>
        </div>
        <div className="stat-card yellow">
          <h4>Total Bookings</h4>
          <p>932</p>
        </div>
        <div className="stat-card red">
          <h4>Revenue This Month</h4>
          <p>Rs 1,200,000</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Monthly Revenue (Chart Placeholder)</h3>
        <div className="chart-placeholder">
          📊 Chart will be integrated here using Chart.js or Recharts.
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
