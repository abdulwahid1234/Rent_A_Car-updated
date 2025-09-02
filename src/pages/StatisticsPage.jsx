import React from "react";
import "./Statistics.css";

const cards = [
  { id: "cars", title: "Total Cars", value: "35", tone: "blue" },
  { id: "drivers", title: "Total Drivers", value: "18", tone: "green" },
  { id: "bookings", title: "Total Bookings", value: "932", tone: "yellow" },
  { id: "revenue", title: "Revenue This Month", value: "Rs 1,200,000", tone: "red" },
];

const StatisticsPage = () => {
  return (
    <div className="statistics">
      <h2>Dashboard Statistics</h2>

      {/* KPI Cards */}
      <div className="stats-grid">
        {cards.map((c) => (
          <div key={c.id} className={`stat ${c.tone}`}>
            <h4>{c.title}</h4>
            <p>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <section className="chart-card">
        <div className="chart-header">
          <h3>Monthly Revenue (Chart Placeholder)</h3>
          <button type="button" className="btn btn-outline" onClick={() => {}}>
            Export CSV
          </button>
        </div>
        <div className="chart-placeholder" role="img" aria-label="Chart placeholder">
          📊 Chart will be integrated here (Chart.js / Recharts)
        </div>
      </section>
    </div>
  );
};

export default StatisticsPage;
