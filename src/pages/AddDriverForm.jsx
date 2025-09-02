import React, { useState, useEffect } from 'react';
import './AddDriverForm.css';

const AddDriverForm = ({ onClose, onSave, initialData }) => {
  const [form, setForm] = useState({
    id: null,
    name: '',
    cnic: '',
    mobile: '',
    license: '',
    image: '',
    status: 'Available',
    address: ''
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="add-driver-form">
        <h3>{form.id ? 'Edit Driver' : 'Add New Driver'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="cnic" placeholder="CNIC" value={form.cnic} onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
          <input name="license" placeholder="License No" value={form.license} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />

          {/* Image file upload */}
          <input type="file" name="image" onChange={handleImageChange} />
          {form.image && <img src={form.image} alt="Driver" style={{ width: 100, height: 100, marginTop: 10 }} />}
          
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Available</option>
            <option>On Duty</option>
            <option>Unavailable</option>
          </select>

          <div className="form-actions">
            <button type="submit">{form.id ? 'Update' : 'Save'}</button>
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriverForm;
