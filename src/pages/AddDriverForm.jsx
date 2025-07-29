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
          <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
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
