import React, { useState, useEffect, useMemo } from "react";
import { FiSearch, FiUserCheck, FiAlertCircle } from "react-icons/fi";
import "./Bookings.css";

const Bookings = () => {
  const [showModal, setShowModal] = useState(false);

  // data
  const [bookings, setBookings] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);

  // form state
  const [cnic, setCnic] = useState("");
  const [foundCustomer, setFoundCustomer] = useState(null);
  const [selectedCar, setSelectedCar] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // cache customers list for lookup
  const [allCustomers, setAllCustomers] = useState([]);

  // helpers
  const normalizeCNIC = (v = "") => v.replace(/\D/g, ""); // digits only
  const formatCNIC = (v = "") => {
    // simple formatter: 12345-1234567-1
    const d = v.replace(/\D/g, "").slice(0, 13);
    const p1 = d.slice(0, 5);
    const p2 = d.slice(5, 12);
    const p3 = d.slice(12, 13);
    let out = p1;
    if (p2) out += "-" + p2;
    if (p3) out += "-" + p3;
    return out;
  };

  // Load cars, bookings, customers
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

  // live lookup on CNIC type
  useEffect(() => {
    if (!cnic) {
      setFoundCustomer(null);
      return;
    }
    const digits = normalizeCNIC(cnic);
    // exact match (13 digits) → pick exact; otherwise no match yet
    if (digits.length === 13) {
      const match = allCustomers.find(
        (c) => normalizeCNIC(c.cnic) === digits
      );
      setFoundCustomer(match || null);
    } else {
      setFoundCustomer(null);
    }
  }, [cnic, allCustomers]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!cnic || !selectedCar || !fromDate || !toDate) {
      alert("Please fill all fields");
      return;
    }
    if (!foundCustomer) {
      alert("CNIC not found in Customers. Please add the customer first.");
      return;
    }

    const newBooking = {
      id: `B${Date.now()}`,
      customer: foundCustomer.name,          // name used in table
      customerCnic: foundCustomer.cnic,      // keep CNIC too
      car: selectedCar,
      from: fromDate,
      to: toDate,
      amount: "0",
      status: "Confirmed",
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Update cars → mark selected as booked
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

    // reset
    setCnic("");
    setFoundCustomer(null);
    setSelectedCar("");
    setFromDate("");
    setToDate("");
    setShowModal(false);
  };

  return (
    <div className="bookings-page p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
        >
          + New Booking
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-2 text-left">Booking ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Car</th>
              <th className="p-2 text-left">From</th>
              <th className="p-2 text-left">To</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="p-2">{booking.id}</td>
                <td className="p-2">
                  {booking.customer}
                  {booking.customerCnic ? (
                    <span className="cnic-chip">{booking.customerCnic}</span>
                  ) : null}
                </td>
                <td className="p-2">{booking.car}</td>
                <td className="p-2">{booking.from}</td>
                <td className="p-2">{booking.to}</td>
                <td className="p-2">{booking.amount}</td>
                <td className="p-2 text-green-700">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-form1" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">New Booking</h3>

            <form onSubmit={handleBookingSubmit}>
              {/* CNIC lookup */}
              <div className="mb-4">
                <label>Customer CNIC:</label>
                <div className="input-with-icon">
                  <FiSearch className="left-icon" />
                  <input
                    type="text"
                    className="input"
                    placeholder="12345-6789012-3"
                    value={formatCNIC(cnic)}
                    onChange={(e) => setCnic(e.target.value)}
                    maxLength={15}
                  />
                  {cnic ? (
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

                {foundCustomer && (
                  <div className="customer-preview">
                    <div>
                      <div className="cp-name">{foundCustomer.name}</div>
                      <div className="cp-sub">
                        {foundCustomer.mobile} • {foundCustomer.email || "-"}
                      </div>
                    </div>
                    <div className="cp-cnic">{foundCustomer.cnic}</div>
                  </div>
                )}
              </div>

              {/* Car */}
              <div className="mb-4">
                <label>Car:</label>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    className="input"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label>End Date:</label>
                  <input
                    type="date"
                    className="input"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="bg-gray-400 px-4 py-2 rounded text-white"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 px-4 py-2 rounded text-white"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
