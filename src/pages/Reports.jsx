import React, { useMemo, useState } from "react";
import "./Report.css";

const reportData = [
  { car: "Honda Civic", regNo: "ACQ 346", bookings: 30, revenue: 150000, expense: 25000 },
  { car: "Fortuner",    regNo: "ALI 38",  bookings: 19, revenue: 351500, expense: 91000 },
  { car: "BRV",         regNo: "AQV 189", bookings: 30, revenue: 109980, expense: 9000   },
];

const ReportPage = () => {
  const [month, setMonth] = useState("2024-07");

  const handleExport = (type) => {
    // Wire up your real export here
    alert(`Exporting report as ${type}`);
  };

  const totals = useMemo(() => {
    const totalBookings = reportData.reduce((s, c) => s + c.bookings, 0);
    const totalRevenue  = reportData.reduce((s, c) => s + c.revenue, 0);
    const totalExpense  = reportData.reduce((s, c) => s + c.expense, 0);
    return {
      totalBookings,
      totalRevenue,
      totalExpense,
      totalProfit: totalRevenue - totalExpense,
    };
  }, []);

  const monthLabel = useMemo(() => {
    const [y, m] = month.split("-");
    const d = new Date(Number(y), Number(m) - 1, 1);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [month]);

  const fmtRs = (n) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="report">
      <h2>Monthly Report — {monthLabel}</h2>

      <div className="report-controls1">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          aria-label="Select month"
        />
        <div className="btn-group">
          <button className="btn btn-outline" onClick={() => handleExport("Excel")}>
            Export Excel
          </button>
          <button className="btn btn-primary" onClick={() => handleExport("PDF")}>
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card blue">
          <h4>Total Bookings</h4>
          <p>{totals.totalBookings}</p>
        </div>
        <div className="summary-card green">
          <h4>Total Revenue</h4>
          <p>{fmtRs(totals.totalRevenue)}</p>
        </div>
        <div className="summary-card red">
          <h4>Total Expenses</h4>
          <p>{fmtRs(totals.totalExpense)}</p>
        </div>
        <div className="summary-card yellow">
          <h4>Net Profit</h4>
          <p>{fmtRs(totals.totalProfit)}</p>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
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
            {reportData.map((car, i) => {
              const profit = car.revenue - car.expense;
              return (
                <tr key={i}>
                  <td className="cell-strong">{car.car}</td>
                  <td>{car.regNo}</td>
                  <td>{car.bookings}</td>
                  <td>{fmtRs(car.revenue)}</td>
                  <td>{fmtRs(car.expense)}</td>
                  <td className={profit < 0 ? "neg" : "pos"}>{fmtRs(profit)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="totals">
              <td><strong>TOTAL</strong></td>
              <td></td>
              <td><strong>{totals.totalBookings}</strong></td>
              <td><strong>{fmtRs(totals.totalRevenue)}</strong></td>
              <td><strong>{fmtRs(totals.totalExpense)}</strong></td>
              <td className={totals.totalProfit < 0 ? "neg" : "pos"}>
                <strong>{fmtRs(totals.totalProfit)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;
