import React, { useState, useEffect } from "react";
import "./Bookings.css";

const Bookings = () => {
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [customer, setCustomer] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const carList = JSON.parse(localStorage.getItem("cars")) || [];
    setAvailableCars(carList.filter(car => car.status !== "Booked"));

    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!customer || !selectedCar || !fromDate || !toDate) {
      alert("Please fill all fields");
      return;
    }

    const newBooking = {
      id: `B${Date.now()}`,
      customer,
      car: selectedCar,
      from: fromDate,
      to: toDate,
      amount: "0", // You can compute this later
      status: "Confirmed",
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Update car status
    const updatedCars = availableCars.map((car) =>
      car.carName === selectedCar ? { ...car, status: "Booked" } : car
    );
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setAvailableCars(updatedCars);

    setCustomer("");
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
                <td className="p-2">{booking.customer}</td>
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
          <div className="modal-form">
            <h3 className="text-xl font-bold mb-4">New Booking</h3>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label>Customer Name:</label>
                <input
                  type="text"
                  className="input"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label>Car:</label>
                <select
                  className="input"
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                >
                  <option>Select Car</option>
                  {availableCars.map((car, idx) => (
                    <option key={idx} value={car.carName}>{car.carName}</option>
                  ))}
                </select>
              </div>
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
