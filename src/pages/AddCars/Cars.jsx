import React, { useState } from 'react';
import './Cars.css';

// Your complete CarManagement component code here
// CarManagement.jsx
function CarManagement() {
  const [cars, setCars] = React.useState([
    {
      id: 1,
      year: 2022,
      make: "Toyota",
      model: "Camry",
      status: "available",
      color: "Silver",
      dailyRate: 45,
      mileage: "15,000 mi",
      fuel: "Gasoline",
      transmission: "Automatic",
    },
    {
      id: 2,
      year: 2023,
      make: "Honda",
      model: "Civic",
      status: "rented",
      color: "Blue",
      dailyRate: 40,
      mileage: "8,000 mi",
      fuel: "Gasoline",
      transmission: "Manual",
    },
    {
      id: 3,
      year: 2021,
      make: "BMW",
      model: "X5",
      status: "available",
      color: "Black",
      dailyRate: 85,
      mileage: "25,000 mi",
      fuel: "Gasoline",
      transmission: "Automatic",
    },
    {
      id: 4,
      year: 2023,
      make: "Tesla",
      model: "Model 3",
      status: "available",
      color: "White",
      dailyRate: 75,
      mileage: "5,000 mi",
      fuel: "Electric",
      transmission: "Automatic",
    },
  ]);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedCar, setSelectedCar] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  // Filter cars based on search and status
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.year.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCar = (newCar) => {
    const carWithId = {
      ...newCar,
      id: Math.max(...cars.map(c => c.id)) + 1,
      status: "available"
    };
    setCars([...cars, carWithId]);
    setShowAddModal(false);
  };

  const handleEditCar = (updatedCar) => {
    setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
    setShowEditModal(false);
    setSelectedCar(null);
  };

  const handleDeleteCar = () => {
    setCars(cars.filter(car => car.id !== selectedCar.id));
    setShowDeleteModal(false);
    setSelectedCar(null);
  };

  const openEditModal = (car) => {
    setSelectedCar(car);
    setShowEditModal(true);
  };

  const openDeleteModal = (car) => {
    setSelectedCar(car);
    setShowDeleteModal(true);
  };

  return (
    <div className="car-management">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Car Management</h1>
            <p>Manage your fleet of rental cars</p>
          </div>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            <span className="plus-icon">+</span>
            Add New Car
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-section1">
        <div className="search-container1">
          <div className="search-input-container1">
            <span className="search-icon1">🔍</span>
            <input
              type="text"
              placeholder="Search cars by make, model, or license plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input1"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Car Grid */}
      <div className="cars-grid">
        {filteredCars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-header">
              <div className="car-header-content">
                <span className="car-icon">🚗</span>
                <div className="car-title-section">
                  <h3 className="car-title">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <span className={`status-badge ${car.status}`}>
                    {car.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="car-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">COLOR:</span>
                  <span className="detail-value">{car.color}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">DAILY RATE:</span>
                  <span className="detail-value">${car.dailyRate}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">MILEAGE:</span>
                  <span className="detail-value">{car.mileage}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">FUEL:</span>
                  <span className="detail-value">{car.fuel}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item full-width">
                  <span className="detail-label">TRANSMISSION:</span>
                  <span className="detail-value">{car.transmission}</span>
                </div>
              </div>
              
              <div className="car-actions">
                <button className="edit-btn" onClick={() => openEditModal(car)}>
                  ✏️ Edit
                </button>
                <button className="delete-btn" onClick={() => openDeleteModal(car)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddCarModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCar}
        />
      )}

      {showEditModal && selectedCar && (
        <EditCarModal
          car={selectedCar}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCar(null);
          }}
          onSave={handleEditCar}
        />
      )}

      {showDeleteModal && selectedCar && (
        <DeleteConfirmModal
          car={selectedCar}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCar(null);
          }}
          onConfirm={handleDeleteCar}
        />
      )}
    </div>
  );
}

// Add Car Modal Component
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

// Edit Car Modal Component
function EditCarModal({ car, onClose, onSave }) {
  const [formData, setFormData] = React.useState({
    year: car.year.toString(),
    make: car.make,
    model: car.model,
    color: car.color,
    dailyRate: car.dailyRate.toString(),
    mileage: car.mileage,
    fuel: car.fuel,
    transmission: car.transmission,
    status: car.status
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
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...car,
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
          <h2>Edit {car.year} {car.make} {car.model}</h2>
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

          <div className="form-group">
            <label>Status *</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className={errors.status ? "error" : ""}
            >
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
            {errors.status && <span className="error-text">{errors.status}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Confirmation Modal Component
function DeleteConfirmModal({ car, onClose, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Car</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="delete-content">
          <div className="warning-icon">⚠️</div>
          <p>Are you sure you want to delete the <strong>{car.year} {car.make} {car.model}</strong>?</p>
          {car.status === "rented" && (
            <div className="warning-message">
              <strong>Warning:</strong> This car is currently rented. Deleting it may affect active rentals.
            </div>
          )}
          <p className="warning-text">This action cannot be undone.</p>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="delete-confirm-btn" onClick={onConfirm}>
            Delete Car
          </button>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return <CarManagement />;
}

// Export individual components for reusability
export { CarManagement as default, AddCarModal, EditCarModal, DeleteConfirmModal };