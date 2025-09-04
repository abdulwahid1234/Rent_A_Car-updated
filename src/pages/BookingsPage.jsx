import React, { useState, useEffect } from "react";
import { FiSearch, FiUserCheck, FiAlertCircle } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Bookings.css";

const Bookings = () => {
  const [showModal, setShowModal] = useState(false);

  // data
  const [bookings, setBookings] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);

  // customers cache
  const [allCustomers, setAllCustomers] = useState([]);

  // form state (shared by new/edit)
  const [searchInput, setSearchInput] = useState(""); // CNIC or Name (display text)
  const [foundCustomer, setFoundCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // set when user clicks the found card
  const [selectedCar, setSelectedCar] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // editing state
  const [editingBooking, setEditingBooking] = useState(null);

  // utils
  const normalizeCNIC = (v = "") => v.replace(/\D/g, "");
  const formatCNIC = (v = "") => {
    const d = v.replace(/\D/g, "").slice(0, 13);
    const p1 = d.slice(0, 5);
    const p2 = d.slice(5, 12);
    const p3 = d.slice(12, 13);
    let out = p1;
    if (p2) out += "-" + p2;
    if (p3) out += "-" + p3;
    return out;
  };
  const displayCustomer = (c) => `${c.name} — ${formatCNIC(c.cnic)}`;

  // initial load
  useEffect(() => {
    const allCars = JSON.parse(localStorage.getItem("cars")) || [];
    const avail = allCars.filter(
      (c) => (c.status || "available").toLowerCase() !== "booked"
    );
    setAvailableCars(avail);

    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);

    const savedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
    setAllCustomers(savedCustomers);
  }, []);

  // live lookup for NEW booking (or when typing again during edit—though customer is locked in edit)
  useEffect(() => {
    if (!searchInput.trim()) {
      setFoundCustomer(null);
      return;
    }

    // if a customer has been selected and the input exactly matches the display, keep it
    if (selectedCustomer && searchInput === displayCustomer(selectedCustomer)) {
      setFoundCustomer(selectedCustomer);
      return;
    }

    const digits = normalizeCNIC(searchInput);
    let match = null;

    if (digits.length === 13) {
      match = allCustomers.find((c) => normalizeCNIC(c.cnic) === digits);
    }
    if (!match) {
      match = allCustomers.find((c) =>
        (c.name || "").toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFoundCustomer(match || null);
  }, [searchInput, allCustomers, selectedCustomer]);

  // persist helper
  const persistBookings = (list) => {
    setBookings(list);
    localStorage.setItem("bookings", JSON.stringify(list));
  };

  // submit (handles both new & edit)
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!selectedCar || !fromDate || !toDate) {
      alert("Please fill all fields");
      return;
    }

    if (editingBooking) {
      // update existing booking (customer locked)
      const updated = bookings.map((b) =>
        b.id === editingBooking.id
          ? { ...b, car: selectedCar, from: fromDate, to: toDate }
          : b
      );
      persistBookings(updated);
      // reset
      resetForm();
      return;
    }

    // NEW booking
    const customer = selectedCustomer || foundCustomer;
    if (!customer) {
      alert("Customer not found. Please select the customer by clicking the record below the search.");
      return;
    }

    const newBooking = {
      id: `B${Date.now()}`,
      customer: customer.name,
      customerCnic: customer.cnic,
      car: selectedCar,
      from: fromDate,
      to: toDate,
      amount: "0",
      status: "Confirmed",
    };

    const updatedBookings = [...bookings, newBooking];
    persistBookings(updatedBookings);

    // mark car as booked in storage and refresh available list
    const allCars = JSON.parse(localStorage.getItem("cars")) || [];
    const updatedCars = allCars.map((car) =>
      car.carName === selectedCar ? { ...car, status: "booked" } : car
    );
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setAvailableCars(
      updatedCars.filter(
        (c) => (c.status || "available").toLowerCase() !== "booked"
      )
    );

    resetForm();
  };

  const resetForm = () => {
    setSearchInput("");
    setFoundCustomer(null);
    setSelectedCustomer(null);
    setSelectedCar("");
    setFromDate("");
    setToDate("");
    setEditingBooking(null);
    setShowModal(false);
  };

  // table row actions
  const handleDeleteBooking = (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    const updated = bookings.filter((b) => b.id !== id);
    persistBookings(updated);
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setShowModal(true);
    // lock the currently assigned customer (not editable here)
    setSelectedCustomer({ name: booking.customer, cnic: booking.customerCnic });
    setSearchInput(displayCustomer({ name: booking.customer, cnic: booking.customerCnic }));
    setSelectedCar(booking.car || "");
    setFromDate(booking.from || "");
    setToDate(booking.to || "");
  };

  return (
    <div className="content">
      {/* Header row */}
      <div className="panel-lg shadow-md">
        <div className="section-header">
          <h3>Bookings</h3>
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingBooking(null);
                setSelectedCustomer(null);
                setSearchInput("");
                setSelectedCar("");
                setFromDate("");
                setToDate("");
                setShowModal(true);
              }}
            >
              + New Booking
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>CNIC</th>
                <th>Car</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="font-medium">{b.id}</td>
                  <td>{b.customer}</td>
                  <td>{b.customerCnic}</td>
                  <td>{b.car}</td>
                  <td>{b.from}</td>
                  <td>{b.to}</td>
                  <td>{b.amount}</td>
                  <td>
                    <span className="badge badge-success">{b.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon edit"
                        onClick={() => handleEditBooking(b)}
                        title="Edit"
                        aria-label={`Edit booking ${b.id}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDeleteBooking(b.id)}
                        title="Delete"
                        aria-label={`Delete booking ${b.id}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: 16, color: "var(--text-muted)" }}>
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal (New / Edit) */}
      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingBooking ? "Edit Booking" : "New Booking"}</h3>
              <button className="close-btn" onClick={resetForm} aria-label="Close">✕</button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleBookingSubmit}>
                {/* Customer field */}
                <div className="form-group">
                  <label>Customer CNIC or Name</label>
                  <div className="input-with-icon">
                    <FiSearch className="left-icon" aria-hidden />
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter CNIC (12345-6789012-3) or Name"
                      disabled={!!editingBooking} // lock when editing
                      value={
                        selectedCustomer
                          ? displayCustomer(selectedCustomer)
                          : normalizeCNIC(searchInput).length === 13
                          ? formatCNIC(searchInput)
                          : searchInput
                      }
                      onChange={(e) => {
                        setSelectedCustomer(null); // typing clears selection
                        setSearchInput(e.target.value);
                      }}
                    />
                    {!editingBooking && searchInput ? (
                      foundCustomer ? (
                        <span className="status-pill success">
                          <FiUserCheck /> Found
                        </span>
                      ) : (
                        <span className="status-pill danger">
                          <FiAlertCircle /> Not found
                        </span>
                      )
                    ) : null}
                  </div>
                </div>

                {/* Click-to-select found record (NEW booking only) */}
                {!editingBooking && foundCustomer && (
                  <button
                    type="button"
                    className="customer-preview card shadow-sm clickable"
                    onClick={() => {
                      setSelectedCustomer(foundCustomer);
                      setSearchInput(displayCustomer(foundCustomer)); // fill input
                    }}
                    title="Click to select this customer"
                  >
                    <div>
                      <div className="cp-name">{foundCustomer.name}</div>
                      <div className="cp-sub">
                        {foundCustomer.mobile} • {foundCustomer.email || "-"}
                      </div>
                    </div>
                    <div className="cp-cnic">{foundCustomer.cnic}</div>
                  </button>
                )}

                {/* Car */}
                <div className="form-group">
                  <label>Car</label>
                  <select
                    className="input"
                    value={selectedCar}
                    onChange={(e) => setSelectedCar(e.target.value)}
                  >
                    <option value="">Select Car</option>
                    {availableCars.map((car) => (
                      <option key={car.id} value={car.carName}>
                        {car.carName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="input"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      className="input"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingBooking ? "Update Booking" : "Submit Booking"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
