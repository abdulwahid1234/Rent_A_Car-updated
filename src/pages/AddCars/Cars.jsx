import React from "react";
import "./Cars.css";

function CarManagement() {
  // Seed with localStorage if present; otherwise use defaults and attach carName
  const [cars, setCars] = React.useState(() => {
    const saved = JSON.parse(localStorage.getItem("cars"));
    if (Array.isArray(saved) && saved.length) return saved;

    // default data (with carName)
    return [
      {
        id: 1,
        year: 2022,
        make: "Toyota",
        model: "Camry",
        carName: "2022 Toyota Camry",
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
        carName: "2023 Honda Civic",
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
        carName: "2021 BMW X5",
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
        carName: "2023 Tesla Model 3",
        status: "available",
        color: "White",
        dailyRate: 75,
        mileage: "5,000 mi",
        fuel: "Electric",
        transmission: "Automatic",
      },
    ];
  });

  // Persist cars anytime they change
  React.useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedCar, setSelectedCar] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "all" || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCar = (newCar) => {
    const nextId = cars.length ? Math.max(...cars.map((c) => Number(c.id))) + 1 : 1;
    const carWithId = {
      ...newCar,
      id: nextId,
      status: "available",
      carName: `${newCar.year} ${newCar.make} ${newCar.model}`, // <— key field used by Bookings
    };
    setCars((prev) => [...prev, carWithId]);
    setShowAddModal(false);
  };

  const handleEditCar = (updatedCar) => {
    // Ensure carName stays in sync with year/make/model edits
    const withName = {
      ...updatedCar,
      carName: `${updatedCar.year} ${updatedCar.make} ${updatedCar.model}`,
    };
    setCars((prev) => prev.map((c) => (c.id === withName.id ? withName : c)));
    setShowEditModal(false);
    setSelectedCar(null);
  };

  const handleDeleteCar = () => {
    setCars((prev) => prev.filter((car) => car.id !== selectedCar.id));
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
    <div className="cars">
      {/* Header */}
      <div className="section head">
        <div className="head-inner">
          <div>
            <h1>Car Management</h1>
            <p className="muted">Manage your fleet of rental cars</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <span className="plus">＋</span> Add New Car
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="section search">
        <div className="search-row">
          <div className="input-icon">
            <span className="icon">🔍</span>
            <input
              type="text"
              placeholder="Search cars by make, model, or year…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
            <option value="booked">Booked</option>
          </select>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid1">
        {filteredCars.map((car) => (
          <div key={car.id} className="card">
            <div className="card-head">
              <div className="title">
                <span className="emoji">🚗</span>
                <div className="stack">
                  <h3>
                    {car.year} {car.make} {car.model}
                  </h3>
                  <span className={`badge ${car.status}`}>{car.status}</span>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="item">
                  <span className="label">Color</span>
                  <span className="value">{car.color}</span>
                </div>
                <div className="item">
                  <span className="label">Daily Rate</span>
                  <span className="value">${car.dailyRate}</span>
                </div>
              </div>

              <div className="row">
                <div className="item">
                  <span className="label">Mileage</span>
                  <span className="value">{car.mileage}</span>
                </div>
                <div className="item">
                  <span className="label">Fuel</span>
                  <span className="value">{car.fuel}</span>
                </div>
              </div>

              <div className="row">
                <div className="item full">
                  <span className="label">Transmission</span>
                  <span className="value">{car.transmission}</span>
                </div>
              </div>

              <div className="actions">
                <button className="btn btn-outline" onClick={() => openEditModal(car)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-danger" onClick={() => openDeleteModal(car)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && <AddCarModal onClose={() => setShowAddModal(false)} onSave={handleAddCar} />}

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

/* -------------------- Add Modal -------------------- */
function AddCarModal({ onClose, onSave }) {
  const [formData, setFormData] = React.useState({
    year: "",
    make: "",
    model: "",
    color: "",
    dailyRate: "",
    mileage: "",
    fuel: "",
    transmission: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (field, value) => {
    setFormData((s) => ({ ...s, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.year) e.year = "Year is required";
    if (!formData.make) e.make = "Make is required";
    if (!formData.model) e.model = "Model is required";
    if (!formData.color) e.color = "Color is required";
    if (!formData.dailyRate) e.dailyRate = "Daily rate is required";
    if (!formData.mileage) e.mileage = "Mileage is required";
    if (!formData.fuel) e.fuel = "Fuel is required";
    if (!formData.transmission) e.transmission = "Transmission is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...formData,
      year: parseInt(formData.year, 10),
      dailyRate: parseFloat(formData.dailyRate),
    });
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Add New Car</h3>
          <button className="icon-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="cols">
            <div className="field">
              <label>Year *</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className={errors.year ? "invalid" : ""}
              />
              {errors.year && <span className="hint">{errors.year}</span>}
            </div>
            <div className="field">
              <label>Daily Rate ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.dailyRate}
                onChange={(e) => handleChange("dailyRate", e.target.value)}
                className={errors.dailyRate ? "invalid" : ""}
              />
              {errors.dailyRate && <span className="hint">{errors.dailyRate}</span>}
            </div>
          </div>

          <div className="field">
            <label>Make *</label>
            <input
              type="text"
              value={formData.make}
              onChange={(e) => handleChange("make", e.target.value)}
              className={errors.make ? "invalid" : ""}
            />
            {errors.make && <span className="hint">{errors.make}</span>}
          </div>

          <div className="field">
            <label>Model *</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleChange("model", e.target.value)}
              className={errors.model ? "invalid" : ""}
            />
            {errors.model && <span className="hint">{errors.model}</span>}
          </div>

          <div className="cols">
            <div className="field">
              <label>Color *</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
                className={errors.color ? "invalid" : ""}
              />
              {errors.color && <span className="hint">{errors.color}</span>}
            </div>
            <div className="field">
              <label>Mileage *</label>
              <input
                type="text"
                placeholder="e.g., 15,000 mi"
                value={formData.mileage}
                onChange={(e) => handleChange("mileage", e.target.value)}
                className={errors.mileage ? "invalid" : ""}
              />
              {errors.mileage && <span className="hint">{errors.mileage}</span>}
            </div>
          </div>

          <div className="cols">
            <div className="field">
              <label>Fuel Type *</label>
              <select
                value={formData.fuel}
                onChange={(e) => handleChange("fuel", e.target.value)}
                className={errors.fuel ? "invalid" : ""}
              >
                <option value="">Select fuel type</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.fuel && <span className="hint">{errors.fuel}</span>}
            </div>
            <div className="field">
              <label>Transmission *</label>
              <select
                value={formData.transmission}
                onChange={(e) => handleChange("transmission", e.target.value)}
                className={errors.transmission ? "invalid" : ""}
              >
                <option value="">Select transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>
              {errors.transmission && <span className="hint">{errors.transmission}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------- Edit Modal -------------------- */
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
    status: car.status,
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (field, value) => {
    setFormData((s) => ({ ...s, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.year) e.year = "Year is required";
    if (!formData.make) e.make = "Make is required";
    if (!formData.model) e.model = "Model is required";
    if (!formData.color) e.color = "Color is required";
    if (!formData.dailyRate) e.dailyRate = "Daily rate is required";
    if (!formData.mileage) e.mileage = "Mileage is required";
    if (!formData.fuel) e.fuel = "Fuel is required";
    if (!formData.transmission) e.transmission = "Transmission is required";
    if (!formData.status) e.status = "Status is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...car,
      ...formData,
      year: parseInt(formData.year, 10),
      dailyRate: parseFloat(formData.dailyRate),
    });
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>
            Edit {car.year} {car.make} {car.model}
          </h3>
          <button className="icon-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="cols">
            <div className="field">
              <label>Year *</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className={errors.year ? "invalid" : ""}
              />
              {errors.year && <span className="hint">{errors.year}</span>}
            </div>
            <div className="field">
              <label>Daily Rate ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.dailyRate}
                onChange={(e) => handleChange("dailyRate", e.target.value)}
                className={errors.dailyRate ? "invalid" : ""}
              />
              {errors.dailyRate && <span className="hint">{errors.dailyRate}</span>}
            </div>
          </div>

          <div className="field">
            <label>Make *</label>
            <input
              type="text"
              value={formData.make}
              onChange={(e) => handleChange("make", e.target.value)}
              className={errors.make ? "invalid" : ""}
            />
            {errors.make && <span className="hint">{errors.make}</span>}
          </div>

          <div className="field">
            <label>Model *</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleChange("model", e.target.value)}
              className={errors.model ? "invalid" : ""}
            />
            {errors.model && <span className="hint">{errors.model}</span>}
          </div>

          <div className="cols">
            <div className="field">
              <label>Color *</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
                className={errors.color ? "invalid" : ""}
              />
              {errors.color && <span className="hint">{errors.color}</span>}
            </div>
            <div className="field">
              <label>Mileage *</label>
              <input
                type="text"
                value={formData.mileage}
                onChange={(e) => handleChange("mileage", e.target.value)}
                className={errors.mileage ? "invalid" : ""}
              />
              {errors.mileage && <span className="hint">{errors.mileage}</span>}
            </div>
          </div>

          <div className="cols">
            <div className="field">
              <label>Fuel Type *</label>
              <select
                value={formData.fuel}
                onChange={(e) => handleChange("fuel", e.target.value)}
                className={errors.fuel ? "invalid" : ""}
              >
                <option value="">Select fuel type</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.fuel && <span className="hint">{errors.fuel}</span>}
            </div>
            <div className="field">
              <label>Transmission *</label>
              <select
                value={formData.transmission}
                onChange={(e) => handleChange("transmission", e.target.value)}
                className={errors.transmission ? "invalid" : ""}
              >
                <option value="">Select transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>
              {errors.transmission && <span className="hint">{errors.transmission}</span>}
            </div>
          </div>

          <div className="field">
            <label>Status *</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className={errors.status ? "invalid" : ""}
            >
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
              <option value="booked">Booked</option>
            </select>
            {errors.status && <span className="hint">{errors.status}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* --------------- Delete Confirm Modal --------------- */
function DeleteConfirmModal({ car, onClose, onConfirm }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Delete Car</h3>
          <button className="icon-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="confirm">
          <div className="warn">⚠️</div>
          <p>
            Are you sure you want to delete <strong>{car.year} {car.make} {car.model}</strong>?
          </p>
          {car.status === "rented" && (
            <div className="banner">
              <strong>Note:</strong> This car is currently rented. Deleting it may affect active rentals.
            </div>
          )}
          <p className="muted">This action cannot be undone.</p>
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Delete Car
          </button>
        </div>
      </div>
    </div>
  );
}

export { CarManagement as default, AddCarModal, EditCarModal, DeleteConfirmModal };
