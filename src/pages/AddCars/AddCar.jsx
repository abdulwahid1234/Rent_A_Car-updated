import React from 'react'
// import PropTypes from 'prop-types'
import "./Cars.css";


function AddCarModal({ onClose, onSave }) {
  const [formData, setFormData] = React.useState({
    year: "",
    make: "",
    model: "",
    color: "",
    dailyRate: "",
    mileage: "",
    fuel: "",
    transmission: ""
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.dailyRate) newErrors.dailyRate = "Daily rate is required";
    if (!formData.mileage) newErrors.mileage = "Mileage is required";
    if (!formData.fuel) newErrors.fuel = "Fuel type is required";
    if (!formData.transmission) newErrors.transmission = "Transmission is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        year: parseInt(formData.year),
        dailyRate: parseFloat(formData.dailyRate)
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Car</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-row">
            <div className="form-group">
              <label>Year *</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className={errors.year ? "error" : ""}
              />
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>
            
            <div className="form-group">
              <label>Daily Rate ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.dailyRate}
                onChange={(e) => handleChange("dailyRate", e.target.value)}
                className={errors.dailyRate ? "error" : ""}
              />
              {errors.dailyRate && <span className="error-text">{errors.dailyRate}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Make *</label>
            <input
              type="text"
              value={formData.make}
              onChange={(e) => handleChange("make", e.target.value)}
              className={errors.make ? "error" : ""}
            />
            {errors.make && <span className="error-text">{errors.make}</span>}
          </div>

          <div className="form-group">
            <label>Model *</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleChange("model", e.target.value)}
              className={errors.model ? "error" : ""}
            />
            {errors.model && <span className="error-text">{errors.model}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Color *</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
                className={errors.color ? "error" : ""}
              />
              {errors.color && <span className="error-text">{errors.color}</span>}
            </div>
            
            <div className="form-group">
              <label>Mileage *</label>
              <input
                type="text"
                placeholder="e.g., 15,000 mi"
                value={formData.mileage}
                onChange={(e) => handleChange("mileage", e.target.value)}
                className={errors.mileage ? "error" : ""}
              />
              {errors.mileage && <span className="error-text">{errors.mileage}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fuel Type *</label>
              <select
                value={formData.fuel}
                onChange={(e) => handleChange("fuel", e.target.value)}
                className={errors.fuel ? "error" : ""}
              >
                <option value="">Select fuel type</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.fuel && <span className="error-text">{errors.fuel}</span>}
            </div>
            
            <div className="form-group">
              <label>Transmission *</label>
              <select
                value={formData.transmission}
                onChange={(e) => handleChange("transmission", e.target.value)}
                className={errors.transmission ? "error" : ""}
              >
                <option value="">Select transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>
              {errors.transmission && <span className="error-text">{errors.transmission}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal
