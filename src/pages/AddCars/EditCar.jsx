// Edit Car Modal Component
import "./Cars.css";

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
export default EditCarModal