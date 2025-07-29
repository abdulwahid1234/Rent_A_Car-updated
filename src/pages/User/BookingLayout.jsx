// import React, { useState } from 'react';
// import './BookingLayout.css';

// // Car Slideshow Component
// const CarSlideshow = () => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const images = [
//     'https://via.placeholder.com/600x300?text=Car+1',
//     'https://via.placeholder.com/600x300?text=Car+2',
//     'https://via.placeholder.com/600x300?text=Car+3',
//   ];

//   const nextImage = () => {
//     setCurrentImage((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
//   };

//   return (
//     <div className="car-slideshow">
//       <button className="nav-btn" onClick={prevImage}>
//         Prev
//       </button>
//       <img src={images[currentImage]} alt="Car" className="car-image" />
//       <button className="nav-btn" onClick={nextImage}>
//         Next
//       </button>
//     </div>
//   );
// };

// // Main Booking Layout
// const BookingLayout = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [rentalDays, setRentalDays] = useState(1);
//   const [bookingNotes, setBookingNotes] = useState('');
//   const [bookings, setBookings] = useState([]);

//   const handleAddBooking = () => {
//     const newBooking = {
//       id: Date.now(),
//       date: selectedDate,
//       rentalDays,
//       notes: bookingNotes,
//     };
//     setBookings([...bookings, newBooking]);
//   };

//   const handleEditBooking = (id) => {
//     const booking = bookings.find((booking) => booking.id === id);
//     setSelectedDate(booking.date);
//     setRentalDays(booking.rentalDays);
//     setBookingNotes(booking.notes);
//   };

//   const handleDeleteBooking = (id) => {
//     setBookings(bookings.filter((booking) => booking.id !== id));
//   };

//   return (
//     <div className="booking-layout">
//       <h1>Vehicle Booking</h1>
//       <div className="calendar">
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//       </div>
//       <div className="rental-options">
//         <label>Rental Days:</label>
//         <input
//           type="number"
//           value={rentalDays}
//           onChange={(e) => setRentalDays(e.target.value)}
//           min="1"
//         />
//       </div>
//       <div className="notes-section">
//         <label>Booking Notes:</label>
//         <textarea
//           value={bookingNotes}
//           onChange={(e) => setBookingNotes(e.target.value)}
//           placeholder="Enter any special requests..."
//         />
//       </div>
//       <button className="add-booking" onClick={handleAddBooking}>
//         Add Booking
//       </button>

//       <div className="booking-list">
//         {bookings.map((booking) => (
//           <div key={booking.id} className="booking-item">
//             <p>Date: {booking.date}</p>
//             <p>Rental Days: {booking.rentalDays}</p>
//             <p>Notes: {booking.notes}</p>
//             <button onClick={() => handleEditBooking(booking.id)}>Edit</button>
//             <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
//           </div>
//         ))}
//       </div>

//       <CarSlideshow />
//     </div>
//   );
// };

// export default BookingLayout;


"use client"

import { useState } from "react"
import './BookingLayout.css';
import image from "../../assets/image.png"

const VehicleBooking = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    vehicleType: "",
    driverAge: "",
    numberOfPassengers: "1",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!bookingData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!bookingData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!bookingData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!bookingData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!bookingData.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required"
    if (!bookingData.dropoffLocation.trim()) newErrors.dropoffLocation = "Drop-off location is required"
    if (!bookingData.pickupDate) newErrors.pickupDate = "Pickup date is required"
    if (!bookingData.pickupTime) newErrors.pickupTime = "Pickup time is required"
    if (!bookingData.returnDate) newErrors.returnDate = "Return date is required"
    if (!bookingData.returnTime) newErrors.returnTime = "Return time is required"
    if (!bookingData.vehicleType) newErrors.vehicleType = "Vehicle type is required"
    if (!bookingData.driverAge) newErrors.driverAge = "Driver age is required"

    // Check if return date is after pickup date
    if (bookingData.pickupDate && bookingData.returnDate) {
      const pickup = new Date(bookingData.pickupDate)
      const returnDate = new Date(bookingData.returnDate)
      if (returnDate <= pickup) {
        newErrors.returnDate = "Return date must be after pickup date"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Booking submitted:", bookingData)
      setBookingSuccess(true)

      // Reset form after successful submission
      setTimeout(() => {
        setBookingData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          pickupLocation: "",
          dropoffLocation: "",
          pickupDate: "",
          pickupTime: "",
          returnDate: "",
          returnTime: "",
          vehicleType: "",
          driverAge: "",
          numberOfPassengers: "1",
        })
        setBookingSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="vehicle-booking">

      {/* <header className="header">

        <div className="top-bar">
          <div className="container">
            <div className="contact-info">
              <span className="phone">📞 +91 080 987 6541</span>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                📘
              </a>
              <a href="#" className="social-link">
                🐦
              </a>
              <a href="#" className="social-link">
                📧
              </a>
              <a href="#" className="social-link">
                💼
              </a>
            </div>
          </div>
        </div>


        <div className="main-nav">
          <div className="container">
            <div className="logo">
              DREAM<span className="highlight">DRIVE</span>
            </div>

            <nav className="navigation">
              <a href="#" className="nav-link">
                HOME
              </a>
              <a href="#" className="nav-link">
                ABOUT
              </a>
              <a href="#" className="nav-link">
                VEHICLES
              </a>
              <a href="#" className="nav-link">
                SERVICES
              </a>
              <a href="#" className="nav-link">
                TESTIMONIALS
              </a>
              <a href="#" className="nav-link">
                CONTACT US
              </a>
            </nav>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <div className="hero-grid">
            {/* Left content */}
            <div className="hero-text">
              <h1 className="hero-title">PREMIUM VEHICLE RENTAL</h1>
              <p className="hero-description">
                Experience the freedom of the road with our premium vehicle rental service. From luxury cars to SUVs, we
                have the perfect vehicle for your journey. Book now and drive your dreams.
              </p>
              <button className="cta-button">EXPLORE FLEET</button>
              {/* <div className="image">
              <img src={image} alt="About us" />
            </div> */}
            </div>

            {/* Booking Form */}
            <div className="booking-form-container">
              <div className="booking-form-card">
                <h2 className="form-title">Vehicle Booking Form</h2>

                {bookingSuccess && (
                  <div className="success-message">🎉 Booking submitted successfully! We'll contact you soon.</div>
                )}
                <form onSubmit={handleBookingSubmit} className="booking-form">
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <div className="form-row">
                      <div className="form-field">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={bookingData.firstName}
                          onChange={handleInputChange}
                          className={`form-input ${errors.firstName ? "error" : ""}`}
                        />
                        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                      </div>
                      <div className="form-field">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={bookingData.lastName}
                          onChange={handleInputChange}
                          className={`form-input ${errors.lastName ? "error" : ""}`}
                        />
                        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Information *</label>
                    <div className="form-row">
                      <div className="form-field">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          className={`form-input ${errors.email ? "error" : ""}`}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                      <div className="form-field">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          className={`form-input ${errors.phone ? "error" : ""}`}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">To Location *</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      placeholder="Enter pickup location"
                      value={bookingData.pickupLocation}
                      onChange={handleInputChange}
                      className={`form-input ${errors.pickupLocation ? "error" : ""}`}
                    />
                    {errors.pickupLocation && <span className="error-text">{errors.pickupLocation}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">From Location *</label>
                    <input
                      type="text"
                      name="dropoffLocation"
                      placeholder="Enter drop-off location"
                      value={bookingData.dropoffLocation}
                      onChange={handleInputChange}
                      className={`form-input ${errors.dropoffLocation ? "error" : ""}`}
                    />
                    {errors.dropoffLocation && <span className="error-text">{errors.dropoffLocation}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pickup Date & Time *</label>
                    <div className="form-row">
                      <div className="form-field">
                        <input
                          type="date"
                          name="pickupDate"
                          value={bookingData.pickupDate}
                          onChange={handleInputChange}
                          className={`form-input ${errors.pickupDate ? "error" : ""}`}
                        />
                        {errors.pickupDate && <span className="error-text">{errors.pickupDate}</span>}
                      </div>
                      <div className="form-field">
                        <input
                          type="time"
                          name="pickupTime"
                          value={bookingData.pickupTime}
                          onChange={handleInputChange}
                          className={`form-input ${errors.pickupTime ? "error" : ""}`}
                        />
                        {errors.pickupTime && <span className="error-text">{errors.pickupTime}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Return Date & Time *</label>
                    <div className="form-row">
                      <div className="form-field">
                        <input
                          type="date"
                          name="returnDate"
                          value={bookingData.returnDate}
                          onChange={handleInputChange}
                          className={`form-input ${errors.returnDate ? "error" : ""}`}
                        />
                        {errors.returnDate && <span className="error-text">{errors.returnDate}</span>}
                      </div>
                      <div className="form-field">
                        <input
                          type="time"
                          name="returnTime"
                          value={bookingData.returnTime}
                          onChange={handleInputChange}
                          className={`form-input ${errors.returnTime ? "error" : ""}`}
                        />
                        {errors.returnTime && <span className="error-text">{errors.returnTime}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Vehicle Type *</label>
                    <select
                      name="vehicleType"
                      value={bookingData.vehicleType}
                      onChange={handleInputChange}
                      className={`form-input ${errors.vehicleType ? "error" : ""}`}
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="economy">Economy Car</option>
                      <option value="compact">Compact Car</option>
                      <option value="midsize">Midsize Car</option>
                      <option value="luxury">Luxury Car</option>
                      <option value="suv">SUV</option>
                      <option value="van">Van</option>
                      <option value="truck">Truck</option>
                    </select>
                    {errors.vehicleType && <span className="error-text">{errors.vehicleType}</span>}
                  </div>

                  <div className="form-group">
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">Driver Age *</label>
                        <select
                          name="driverAge"
                          value={bookingData.driverAge}
                          onChange={handleInputChange}
                          className={`form-input ${errors.driverAge ? "error" : ""}`}
                        >
                          <option value="">Select Age</option>
                          <option value="18-24">18-24 years</option>
                          <option value="25-34">25-34 years</option>
                          <option value="35-44">35-44 years</option>
                          <option value="45-54">45-54 years</option>
                          <option value="55+">55+ years</option>
                        </select>
                        {errors.driverAge && <span className="error-text">{errors.driverAge}</span>}
                      </div>
                      <div className="form-field">
                        <label className="form-label">Passengers</label>
                        <select
                          name="numberOfPassengers"
                          value={bookingData.numberOfPassengers}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="1">1 Passenger</option>
                          <option value="2">2 Passengers</option>
                          <option value="3">3 Passengers</option>
                          <option value="4">4 Passengers</option>
                          <option value="5">5+ Passengers</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`book-now-btn ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "BOOKING..." : "BOOK NOW"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      {/* <section className="about-section">
        <div className="container">
          <h2 className="section-title">About us</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Welcome to DreamDrive, your premier vehicle rental service. We provide a wide range of high-quality
                vehicles to meet all your transportation needs. From business trips to family vacations, we have the
                perfect vehicle for every occasion.
              </p>
              <p>
                With over 10 years of experience in the industry, we pride ourselves on exceptional customer service,
                competitive prices, and a fleet of well-maintained vehicles.
              </p>
            </div>
            <div className="about-image">
              <img src={image} alt="About us" />
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default VehicleBooking
