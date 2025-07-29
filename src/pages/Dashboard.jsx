"use client"

import { useState, useMemo } from "react"
import "./Dashboard.css"

const initialCarData = [
  {
    id: "1",
    car: "Honda Civic",
    regNo: "ACQ 346",
    totalBookings: 30,
    totalRevenue: 150000,
    expenseDetails: "Oil change",
    currentProfit: 150000,
    afterNetAmount: 112500,
    companyProfit: 37500,
  },
  {
    id: "2",
    car: "Fortuner",
    regNo: "ALI 38",
    totalBookings: 19,
    totalRevenue: 351500.8,
    expenseDetails: "Daily Exp",
    currentProfit: 260500.8,
    afterNetAmount: 195375.6,
    companyProfit: 65125.2,
  },
  {
    id: "3",
    car: "BRV",
    regNo: "AQV 189",
    totalBookings: 30,
    totalRevenue: 109980,
    expenseDetails: "Oil change",
    currentProfit: 100980,
    afterNetAmount: 75735,
    companyProfit: 25245,
  },
  {
    id: "4",
    car: "Cultus",
    regNo: "AEN 589",
    totalBookings: 30,
    totalRevenue: 79980,
    expenseDetails: "DISK break",
    currentProfit: 75630,
    afterNetAmount: 56722.5,
    companyProfit: 18907.5,
  },
  {
    id: "5",
    car: "Civic (2)",
    regNo: "ASB 053",
    totalBookings: 17,
    totalRevenue: 117000,
    expenseDetails: "-",
    currentProfit: 117000,
    afterNetAmount: 87750,
    companyProfit: 29250,
  },
  {
    id: "6",
    car: "Grande",
    regNo: "LEA 561",
    totalBookings: 26,
    totalRevenue: 109500,
    expenseDetails: "Transfer Fee",
    currentProfit: 43500,
    afterNetAmount: 32625,
    companyProfit: 10875,
  },
  {
    id: "7",
    car: "GLI",
    regNo: "RIC 404",
    totalBookings: 22,
    totalRevenue: 76000,
    expenseDetails: "-",
    currentProfit: 74000,
    afterNetAmount: 55500,
    companyProfit: 18500,
  },
]

const Dashboard = () => {
  const [carData, setCarData] = useState(initialCarData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [formData, setFormData] = useState({})

  // Filter data based on search term
  const filteredData = useMemo(() => {
    return carData.filter(
      (car) =>
        car.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.regNo.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [carData, searchTerm])

  // Calculate totals
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, car) => ({
        totalBookings: acc.totalBookings + car.totalBookings,
        totalRevenue: acc.totalRevenue + car.totalRevenue,
        currentProfit: acc.currentProfit + car.currentProfit,
        afterNetAmount: acc.afterNetAmount + car.afterNetAmount,
        companyProfit: acc.companyProfit + car.companyProfit,
      }),
      {
        totalBookings: 0,
        totalRevenue: 0,
        currentProfit: 0,
        afterNetAmount: 0,
        companyProfit: 0,
      },
    )
  }, [filteredData])

  const handleAddCar = () => {
    if (formData.car && formData.regNo) {
      const newCar = {
        id: Date.now().toString(),
        car: formData.car || "",
        regNo: formData.regNo || "",
        totalBookings: Number.parseInt(formData.totalBookings) || 0,
        totalRevenue: Number.parseFloat(formData.totalRevenue) || 0,
        expenseDetails: formData.expenseDetails || "-",
        currentProfit: Number.parseFloat(formData.currentProfit) || 0,
        afterNetAmount: Number.parseFloat(formData.afterNetAmount) || 0,
        companyProfit: Number.parseFloat(formData.companyProfit) || 0,
      }
      setCarData([...carData, newCar])
      setFormData({})
      setIsAddDialogOpen(false)
    }
  }

  const handleEditCar = () => {
    if (editingCar && formData.car && formData.regNo) {
      const updatedCar = {
        ...editingCar,
        ...formData,
        totalBookings: Number.parseInt(formData.totalBookings) || 0,
        totalRevenue: Number.parseFloat(formData.totalRevenue) || 0,
        currentProfit: Number.parseFloat(formData.currentProfit) || 0,
        afterNetAmount: Number.parseFloat(formData.afterNetAmount) || 0,
        companyProfit: Number.parseFloat(formData.companyProfit) || 0,
      }

      setCarData(carData.map((car) => (car.id === editingCar.id ? updatedCar : car)))
      setEditingCar(null)
      setFormData({})
    }
  }

  const handleDeleteCar = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCarData(carData.filter((car) => car.id !== id))
    }
  }

  const openEditDialog = (car) => {
    setEditingCar(car)
    setFormData(car)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const exportToCSV = () => {
    const headers = [
      "Car",
      "Reg No",
      "Total Bookings",
      "Total Revenue",
      "Expense Details",
      "Current Profit",
      "After 75% Net Amount",
      "Company Profit",
    ]
    const csvContent = [
      headers.join(","),
      ...filteredData.map((car) =>
        [
          car.car,
          car.regNo,
          car.totalBookings,
          car.totalRevenue,
          car.expenseDetails,
          car.currentProfit,
          car.afterNetAmount,
          car.companyProfit,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "car-rental-report.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Top Cards */}
        <div className="top-cards">
          <div className="card green-card">
            <div className="card-content">
              <p className="card-label">Expenses</p>
              <h3 className="card-value green-text">$324.00</h3>
              <small className="card-subtitle">From Last Month</small>
            </div>
          </div>
          <div className="card red-card">
            <div className="card-content">
              <p className="card-label">Income</p>
              <h3 className="card-value red-text">$9,748</h3>
              <small className="card-subtitle">From Last Month</small>
            </div>
          </div>
          <div className="card yellow-card">
            <div className="card-content">
              <p className="card-label">Middle Price</p>
              <h3 className="card-value yellow-text">$1,733</h3>
              <small className="card-subtitle">From Last Month</small>
            </div>
          </div>
          <div className="card blue-card">
            <div className="card-content">
              <p className="card-label">Profit</p>
              <h3 className="card-value blue-text">$4,845</h3>
              <small className="card-subtitle">From Last Month</small>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="middle-section">
          <div className="card red-card">
            <div className="card-header">
              <h4 className="card-title">Car Average Speed</h4>
            </div>
            <div className="card-content">
              <div className="speedometer">52 Km/h</div>
            </div>
          </div>
          <div className="card blue-card">
            <div className="card-header">
              <h4 className="card-title">Status</h4>
            </div>
            <div className="card-content">
              <p>
                Booked: <span className="badge badge-secondary">174</span>
              </p>
              <p>
                On Order: <span className="badge badge-outline">39</span>
              </p>
              <p>
                Awaiting: <span className="badge badge-destructive">12</span>
              </p>
            </div>
          </div>
          <div className="card green-card">
            <div className="card-header">
              <h4 className="card-title">Receiving Orders</h4>
            </div>
            <div className="card-content">
              <p>
                Accepted: <span className="badge badge-success">37,205</span>
              </p>
              <p>
                Rejected: <span className="badge badge-destructive">705</span>
              </p>
              <p>
                Pending: <span className="badge badge-outline">120</span>
              </p>
            </div>
          </div>
        </div>

        {/* Report Section */}
        <div className="report-section">
          <div className="card-header">
            <h2 className="report-title">BISMILLAH RENT A CAR – JANUARY 2024</h2>
            <div className="report-controls">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by car name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
              <div className="button-group">
                <button className="btn btn-success" onClick={() => setIsAddDialogOpen(true)}>
                  ➕ Add Car
                </button>
                <button className="btn btn-outline" onClick={exportToCSV}>
                  📊 Export Excel
                </button>
                <button className="btn btn-outline">📄 Export PDF</button>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="table-container">
              <table className="data-table">
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
                          <button className="btn btn-sm btn-outline" onClick={() => openEditDialog(car)}>
                            ✏️
                          </button>
                          <button className="btn btn-sm btn-destructive" onClick={() => handleDeleteCar(car.id)}>
                            🗑️
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
        </div>

        {/* Add Dialog */}
        {isAddDialogOpen && (
          <div className="modal-overlay" onClick={() => setIsAddDialogOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Add New Car</h3>
                <button className="close-btn" onClick={() => setIsAddDialogOpen(false)}>
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="car">Car Name</label>
                  <input
                    id="car"
                    type="text"
                    value={formData.car || ""}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="regNo">Registration Number</label>
                  <input
                    id="regNo"
                    type="text"
                    value={formData.regNo || ""}
                    onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="totalBookings">Total Bookings</label>
                  <input
                    id="totalBookings"
                    type="number"
                    value={formData.totalBookings || ""}
                    onChange={(e) => setFormData({ ...formData, totalBookings: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="totalRevenue">Total Revenue</label>
                  <input
                    id="totalRevenue"
                    type="number"
                    value={formData.totalRevenue || ""}
                    onChange={(e) => setFormData({ ...formData, totalRevenue: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expenseDetails">Expense Details</label>
                  <input
                    id="expenseDetails"
                    type="text"
                    value={formData.expenseDetails || ""}
                    onChange={(e) => setFormData({ ...formData, expenseDetails: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currentProfit">Current Profit</label>
                  <input
                    id="currentProfit"
                    type="number"
                    value={formData.currentProfit || ""}
                    onChange={(e) => setFormData({ ...formData, currentProfit: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="afterNetAmount">After 75% Net Amount</label>
                  <input
                    id="afterNetAmount"
                    type="number"
                    value={formData.afterNetAmount || ""}
                    onChange={(e) => setFormData({ ...formData, afterNetAmount: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyProfit">Company Profit</label>
                  <input
                    id="companyProfit"
                    type="number"
                    value={formData.companyProfit || ""}
                    onChange={(e) => setFormData({ ...formData, companyProfit: e.target.value })}
                    className="form-input"
                  />
                </div>
                <button onClick={handleAddCar} className="btn btn-primary btn-full">
                  Add Car
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        {editingCar && (
          <div
            className="modal-overlay"
            onClick={() => {
              setEditingCar(null)
              setFormData({})
            }}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Edit Car Details</h3>
                <button
                  className="close-btn"
                  onClick={() => {
                    setEditingCar(null)
                    setFormData({})
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="edit-car">Car Name</label>
                  <input
                    id="edit-car"
                    type="text"
                    value={formData.car || ""}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-regNo">Registration Number</label>
                  <input
                    id="edit-regNo"
                    type="text"
                    value={formData.regNo || ""}
                    onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-totalBookings">Total Bookings</label>
                  <input
                    id="edit-totalBookings"
                    type="number"
                    value={formData.totalBookings || ""}
                    onChange={(e) => setFormData({ ...formData, totalBookings: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-totalRevenue">Total Revenue</label>
                  <input
                    id="edit-totalRevenue"
                    type="number"
                    value={formData.totalRevenue || ""}
                    onChange={(e) => setFormData({ ...formData, totalRevenue: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-expenseDetails">Expense Details</label>
                  <input
                    id="edit-expenseDetails"
                    type="text"
                    value={formData.expenseDetails || ""}
                    onChange={(e) => setFormData({ ...formData, expenseDetails: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-currentProfit">Current Profit</label>
                  <input
                    id="edit-currentProfit"
                    type="number"
                    value={formData.currentProfit || ""}
                    onChange={(e) => setFormData({ ...formData, currentProfit: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-afterNetAmount">After 75% Net Amount</label>
                  <input
                    id="edit-afterNetAmount"
                    type="number"
                    value={formData.afterNetAmount || ""}
                    onChange={(e) => setFormData({ ...formData, afterNetAmount: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-companyProfit">Company Profit</label>
                  <input
                    id="edit-companyProfit"
                    type="number"
                    value={formData.companyProfit || ""}
                    onChange={(e) => setFormData({ ...formData, companyProfit: e.target.value })}
                    className="form-input"
                  />
                </div>
                <button onClick={handleEditCar} className="btn btn-primary btn-full">
                  Update Car
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
