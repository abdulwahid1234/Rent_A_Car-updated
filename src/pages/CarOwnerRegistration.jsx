import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaCar, FaCalendarAlt, FaPalette, FaUser, FaIdCard, FaPhone, FaMapMarkerAlt, FaDollarSign
} from "react-icons/fa";
import './CarOwnerRegistration.css';

const CarOwnerRegistration = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      car: {
        make: "",
        model: "",
        year: "",
        registrationNo: "",
        engineNo: "",
        color: "",
        ratePerDay: "",
        status: "Available",
      },
      owner: {
        name: "",
        cnic: "",
        contact: "",
        address: "",
        ownershipType: "Owned",
        revenueShare: "",
      },
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        await axios.post("/api/cars/add", values);
        toast.success("Car & Owner added successfully!");
        resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <div className="car-owner-container">
      <Toaster />
      <h2>Car & Owner Registration</h2>
      <form className="form1" onSubmit={handleSubmit}>
        {/* Car Details */}
        <div>
          <h3>Car Details</h3>
          {[
            { field: "Make", icon: <FaCar /> },
            { field: "Model", icon: <FaCar /> },
            { field: "Year", icon: <FaCalendarAlt /> },
            { field: "RegistrationNo", icon: <FaIdCard /> },
            { field: "EngineNo", icon: <FaIdCard /> },
            { field: "Color", icon: <FaPalette /> },
            { field: "RatePerDay", icon: <FaDollarSign /> },
          ].map(({ field, icon }) => (
            <div key={field} className="mb-4 input-with-icon">
              <label>{field.replace(/([A-Z])/g, " $1")}:</label>
              <span className="icon">{icon}</span>
              <input
                type={["ratePerDay", "year"].includes(field) ? "number" : "text"}
                name={`car.${field}`}
                value={values.car[field]}
                onChange={handleChange}
                placeholder={field}
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label>Status:</label>
            <select
              name="car.status"
              value={values.car.status}
              onChange={handleChange}
            >
              <option>Available</option>
              <option>Unavailable</option>
              <option>Under Maintenance</option>
            </select>
          </div>
        </div>

        {/* Owner Details */}
        <div>
          <h3>Owner Details</h3>
          {[
            { field: "Name", icon: <FaUser /> },
            { field: "Cnic", icon: <FaIdCard /> },
            { field: "Contact", icon: <FaPhone /> },
            { field: "Address", icon: <FaMapMarkerAlt /> },
            { field: "RevenueShare", icon: <FaDollarSign /> },
          ].map(({ field, icon }) => (
            <div key={field} className="mb-4 input-with-icon">
              <label>{field.replace(/([A-Z])/g, " $1")}:</label>
              <span className="icon">{icon}</span>
              <input
                type={field === "revenueShare" ? "number" : "text"}
                name={`owner.${field}`}
                value={values.owner[field]}
                onChange={handleChange}
                placeholder={field}
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label>Ownership Type:</label>
            <select
              name="owner.ownershipType"
              value={values.owner.ownershipType}
              onChange={handleChange}
            >
              <option>Owned</option>
              <option>Leased</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-6">
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Car & Owner"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarOwnerRegistration;
