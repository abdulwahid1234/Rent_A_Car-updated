

import { useState, useMemo } from "react";
import "./Dashboard.css";
import {
  FaSearch, FaPlus, FaFileExcel, FaFilePdf, FaEdit, FaTrash, FaTimes,
} from "react-icons/fa";

const initialCarData = [
  { id: "1", car: "Honda Civic", regNo: "ACQ 346", totalBookings: 30, totalRevenue: 150000, expenseDetails: "Oil change", currentProfit: 150000, afterNetAmount: 112500, companyProfit: 37500 },
  { id: "2", car: "Fortuner", regNo: "ALI 38", totalBookings: 19, totalRevenue: 351500.8, expenseDetails: "Daily Exp", currentProfit: 260500.8, afterNetAmount: 195375.6, companyProfit: 65125.2 },
  { id: "3", car: "BRV", regNo: "AQV 189", totalBookings: 30, totalRevenue: 109980, expenseDetails: "Oil change", currentProfit: 100980, afterNetAmount: 75735, companyProfit: 25245 },
  { id: "4", car: "Cultus", regNo: "AEN 589", totalBookings: 30, totalRevenue: 79980, expenseDetails: "DISK break", currentProfit: 75630, afterNetAmount: 56722.5, companyProfit: 18907.5 },
  { id: "5", car: "Civic (2)", regNo: "ASB 053", totalBookings: 17, totalRevenue: 117000, expenseDetails: "-", currentProfit: 117000, afterNetAmount: 87750, companyProfit: 29250 },
  { id: "6", car: "Grande", regNo: "LEA 561", totalBookings: 26, totalRevenue: 109500, expenseDetails: "Transfer Fee", currentProfit: 43500, afterNetAmount: 32625, companyProfit: 10875 },
  { id: "7", car: "GLI", regNo: "RIC 404", totalBookings: 22, totalRevenue: 76000, expenseDetails: "-", currentProfit: 74000, afterNetAmount: 55500, companyProfit: 18500 },
];

const Dashboard = () => {
  const [carData, setCarData] = useState(initialCarData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({});

  const filteredData = useMemo(
    () =>
      carData.filter(
        (c) =>
          c.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.regNo.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [carData, searchTerm]
  );

  const totals = useMemo(
    () =>
      filteredData.reduce(
        (acc, c) => ({
          totalBookings: acc.totalBookings + c.totalBookings,
          totalRevenue: acc.totalRevenue + c.totalRevenue,
          currentProfit: acc.currentProfit + c.currentProfit,
          afterNetAmount: acc.afterNetAmount + c.afterNetAmount,
          companyProfit: acc.companyProfit + c.companyProfit,
        }),
        { totalBookings: 0, totalRevenue: 0, currentProfit: 0, afterNetAmount: 0, companyProfit: 0 }
      ),
    [filteredData]
  );

  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(n);

  const exportToCSV = () => {
    const headers = [
      "Car","Reg No","Total Bookings","Total Revenue","Expense Details","Current Profit","After 75% Net Amount","Company Profit",
    ];
    const csv = [
      headers.join(","),
      ...filteredData.map((c) =>
        [
          c.car, c.regNo, c.totalBookings, c.totalRevenue, c.expenseDetails,
          c.currentProfit, c.afterNetAmount, c.companyProfit,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "car-rental-report.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const openEditDialog = (car) => { setEditingCar(car); setFormData(car); };

  const handleAddCar = () => {
    if (!formData.car || !formData.regNo) return;
    const n = (v) => (v === "" || v == null ? 0 : Number(v));
    const newCar = {
      id: Date.now().toString(),
      car: formData.car, regNo: formData.regNo,
      totalBookings: n(formData.totalBookings),
      totalRevenue: n(formData.totalRevenue),
      expenseDetails: formData.expenseDetails || "-",
      currentProfit: n(formData.currentProfit),
      afterNetAmount: n(formData.afterNetAmount),
      companyProfit: n(formData.companyProfit),
    };
    setCarData((d) => [...d, newCar]);
    setFormData({}); setIsAddDialogOpen(false);
  };

  const handleEditCar = () => {
    if (!editingCar || !formData.car || !formData.regNo) return;
    const n = (v) => (v === "" || v == null ? 0 : Number(v));
    const updated = {
      ...editingCar,
      ...formData,
      totalBookings: n(formData.totalBookings),
      totalRevenue: n(formData.totalRevenue),
      currentProfit: n(formData.currentProfit),
      afterNetAmount: n(formData.afterNetAmount),
      companyProfit: n(formData.companyProfit),
    };
    setCarData((d) => d.map((c) => (c.id === editingCar.id ? updated : c)));
    setEditingCar(null); setFormData({});
  };

  const handleDeleteCar = (id) => {
    if (window.confirm("Delete this car?")) {
      setCarData((d) => d.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="content"> {/* from index.css layout */}
      {/* Metric cards row */}
      <div className="grid grid-4">
        <div className="metric">
          <div className="row">
            <div className="icon">💵</div>
            <span className="label">Revenue</span>
          </div>
          <div className="value">{formatCurrency(totals.totalRevenue)}</div>
          <div className="sub">Last 30 days</div>
        </div>

        <div className="metric">
          <div className="row">
            <div className="icon">🧾</div>
            <span className="label">Bookings</span>
          </div>
          <div className="value">{totals.totalBookings}</div>
          <div className="sub">Total bookings</div>
        </div>

        <div className="metric">
          <div className="row">
            <div className="icon">🏦</div>
            <span className="label">Company Profit</span>
          </div>
          <div className="value">{formatCurrency(totals.companyProfit)}</div>
          <div className="sub"><span className="chip-up">+5.2%</span> vs last month</div>
        </div>

        <div className="metric">
          <div className="row">
            <div className="icon">📈</div>
            <span className="label">Net Amount (75%)</span>
          </div>
          <div className="value">{formatCurrency(totals.afterNetAmount)}</div>
          <div className="sub">Owner share</div>
        </div>
      </div>

      {/* Status panels */}
      <div className="dashboard-panels">
        <div className="panel-lg">
          <div className="section-header">
            <h3>Car Average Speed</h3>
            <span className="hint">Updated 3 mins ago</span>
          </div>
          <div className="speedometer">52 Km/h</div>
        </div>

        <div className="panel-lg">
          <div className="section-header">
            <h3>Status</h3>
          </div>
          <p>Booked: <span className="badge badge-secondary">174</span></p>
          <p>On Order: <span className="badge badge-outline">39</span></p>
          <p>Awaiting: <span className="badge badge-destructive">12</span></p>
        </div>

        <div className="panel-lg">
          <div className="section-header">
            <h3>Receiving Orders</h3>
          </div>
          <p>Accepted: <span className="badge badge-success">37,205</span></p>
          <p>Rejected: <span className="badge badge-destructive">705</span></p>
          <p>Pending: <span className="badge badge-outline">120</span></p>
        </div>
      </div>

      {/* Report table */}
      <div className="panel-lg">
        <div className="section-header">
          <h3>BISMILLAH RENT A CAR – JANUARY 2024</h3>

          <div className="controls">
            <div className="search with-icon">
              <FaSearch className="search-ico" aria-hidden />
              <input
                className="input"
                placeholder="Search by car name or reg no…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="btns">
              <button className="btn btn-success" onClick={() => setIsAddDialogOpen(true)}>
                <FaPlus /> <span>Add Car</span>
              </button>
              <button className="btn btn-outline" onClick={exportToCSV}>
                <FaFileExcel /> <span>Export Excel</span>
              </button>
              <button className="btn btn-outline">
                <FaFilePdf /> <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>Reg No</th>
                <th>Total Bookings</th>
                <th>Total Revenue</th>
                <th>Expense Details</th>
                <th>Current Profit</th>
                <th>After 75% Net Amount</th>
                <th>Company Profit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((car) => (
                <tr key={car.id}>
                  <td className="font-medium">{car.car}</td>
                  <td>{car.regNo}</td>
                  <td>{car.totalBookings}</td>
                  <td>{formatCurrency(car.totalRevenue)}</td>
                  <td>{car.expenseDetails}</td>
                  <td>{formatCurrency(car.currentProfit)}</td>
                  <td>{formatCurrency(car.afterNetAmount)}</td>
                  <td>{formatCurrency(car.companyProfit)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => openEditDialog(car)}
                        title="Edit"
                        aria-label={`Edit ${car.car}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-destructive"
                        onClick={() => handleDeleteCar(car.id)}
                        title="Delete"
                        aria-label={`Delete ${car.car}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td className="font-bold">TOTAL</td>
                <td></td>
                <td className="font-bold">{totals.totalBookings}</td>
                <td className="font-bold">{formatCurrency(totals.totalRevenue)}</td>
                <td>-</td>
                <td className="font-bold">{formatCurrency(totals.currentProfit)}</td>
                <td className="font-bold">{formatCurrency(totals.afterNetAmount)}</td>
                <td className="font-bold">{formatCurrency(totals.companyProfit)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddDialogOpen && (
        <div className="modal-overlay" onClick={() => setIsAddDialogOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Car</h3>
              <button className="close-btn" onClick={() => setIsAddDialogOpen(false)} aria-label="Close">
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {[
                ["car", "Car Name", "text"],
                ["regNo", "Registration Number", "text"],
                ["totalBookings", "Total Bookings", "number"],
                ["totalRevenue", "Total Revenue", "number"],
                ["expenseDetails", "Expense Details", "text"],
                ["currentProfit", "Current Profit", "number"],
                ["afterNetAmount", "After 75% Net Amount", "number"],
                ["companyProfit", "Company Profit", "number"],
              ].map(([key, label, type]) => (
                <div className="form-group" key={key}>
                  <label htmlFor={key}>{label}</label>
                  <input
                    id={key}
                    type={type}
                    value={formData[key] || ""}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="form-input"
                  />
                </div>
              ))}
              <button onClick={handleAddCar} className="btn btn-primary btn-full">Add Car</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCar && (
        <div
          className="modal-overlay"
          onClick={() => { setEditingCar(null); setFormData({}); }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Car Details</h3>
              <button
                className="close-btn"
                onClick={() => { setEditingCar(null); setFormData({}); }}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {[
                ["car", "Car Name", "text"],
                ["regNo", "Registration Number", "text"],
                ["totalBookings", "Total Bookings", "number"],
                ["totalRevenue", "Total Revenue", "number"],
                ["expenseDetails", "Expense Details", "text"],
                ["currentProfit", "Current Profit", "number"],
                ["afterNetAmount", "After 75% Net Amount", "number"],
                ["companyProfit", "Company Profit", "number"],
              ].map(([key, label, type]) => (
                <div className="form-group" key={`edit-${key}`}>
                  <label htmlFor={`edit-${key}`}>{label}</label>
                  <input
                    id={`edit-${key}`}
                    type={type}
                    value={formData[key] || ""}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="form-input"
                  />
                </div>
              ))}
              <button onClick={handleEditCar} className="btn btn-primary btn-full">Update Car</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
