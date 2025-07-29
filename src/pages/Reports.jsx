import React, { useState } from 'react';
import './Report.css';

const reportData = [
  {
    car: 'Honda Civic',
    regNo: 'ACQ 346',
    bookings: 30,
    revenue: 150000,
    expense: 25000
  },
  {
    car: 'Fortuner',
    regNo: 'ALI 38',
    bookings: 19,
    revenue: 351500,
    expense: 91000
  },
  {
    car: 'BRV',
    regNo: 'AQV 189',
    bookings: 30,
    revenue: 109980,
    expense: 9000
  }
];

const ReportPage = () => {
  const [month, setMonth] = useState('2024-07');

  const handleExport = (type) => {
    alert(`Exporting report as ${type}`);
  };

  const totalRevenue = reportData.reduce((sum, car) => sum + car.revenue, 0);
  const totalExpense = reportData.reduce((sum, car) => sum + car.expense, 0);
  const totalProfit = totalRevenue - totalExpense;

  return (
    <div className="report-container">
      <h2>Monthly Report – July 2024</h2>

      <div className="report-controls1">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={() => handleExport('Excel')}>Export Excel</button>
        <button onClick={() => handleExport('PDF')}>Export PDF</button>
      </div>

      <div className="report-summary">
        <div className="summary-card blue">
          <h4>Total Bookings</h4>
          <p>{reportData.reduce((sum, car) => sum + car.bookings, 0)}</p>
        </div>
        <div className="summary-card green">
          <h4>Total Revenue</h4>
          <p>Rs {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="summary-card red">
          <h4>Total Expenses</h4>
          <p>Rs {totalExpense.toLocaleString()}</p>
        </div>
        <div className="summary-card yellow">
          <h4>Net Profit</h4>
          <p>Rs {totalProfit.toLocaleString()}</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Reg No</th>
              <th>Total Bookings</th>
              <th>Total Revenue</th>
              <th>Total Expense</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((car, index) => (
              <tr key={index}>
                <td>{car.car}</td>
                <td>{car.regNo}</td>
                <td>{car.bookings}</td>
                <td>Rs {car.revenue.toLocaleString()}</td>
                <td>Rs {car.expense.toLocaleString()}</td>
                <td>Rs {(car.revenue - car.expense).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="totals-row">
              <td><strong>TOTAL</strong></td>
              <td></td>
              <td>{reportData.reduce((sum, car) => sum + car.bookings, 0)}</td>
              <td>Rs {totalRevenue.toLocaleString()}</td>
              <td>Rs {totalExpense.toLocaleString()}</td>
              <td>Rs {totalProfit.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;
