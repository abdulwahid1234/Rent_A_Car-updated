import React, { useState } from 'react';
import './Drivers.css';
import AddDriverForm from './AddDriverForm';

const initialDrivers = [
  {
    id: 1,
    name: 'Ahmad Khan',
    cnic: '35201-1234567-1',
    mobile: '0301-1234567',
    image: 'https://via.placeholder.com/80',
    license: 'DL-12345-PK',
    status: 'Available',
    address: 'G-10 Islamabad'
  },
  {
    id: 2,
    name: 'Bilal Ahmed',
    cnic: '37406-9876543-2',
    mobile: '0322-7654321',
    image: 'https://via.placeholder.com/80',
    license: 'DL-54321-PK',
    status: 'On Duty',
    address: 'Johar Town, Lahore'
  },
  {
    id: 3,
    name: 'Saad Iqbal',
    cnic: '61101-5566778-9',
    mobile: '0312-9988776',
    image: 'https://via.placeholder.com/80',
    license: 'DL-99887-PK',
    status: 'Unavailable',
    address: 'Satellite Town, Rawalpindi'
  }
];

const DriversPage = () => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [search, setSearch] = useState('');
  const [editingDriver, setEditingDriver] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleSaveDriver = (driver) => {
    if (driver.id) {
      // Edit existing
      setDrivers(prev => prev.map(d => (d.id === driver.id ? driver : d)));
    } else {
      // Add new driver with image as data URL
      setDrivers(prev => [...prev, { ...driver, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingDriver(null);
  };

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.cnic.includes(search) ||
    d.mobile.includes(search) ||
    d.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="drivers-container">
      <h2>Driver Information</h2>

      {/* Calendar/Map placeholder */}
      <div className="calendar-placeholder">
        📍 Map/Calendar for Driver Duty Tracking – Coming Soon
      </div>

      <div className="driver-controls">
        <input
          type="text"
          placeholder="Search drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => {
          setEditingDriver(null);
          setShowForm(true);
        }}>
          + Add Driver
        </button>
      </div>

      <div className="drivers-grid">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="driver-card">
            <img src={driver.image} alt={driver.name} />
            <h3>{driver.name}</h3>
            <div className="driver-details">
              <p><span>CNIC:</span> {driver.cnic}</p>
              <p><span>Mobile:</span> {driver.mobile}</p>
              <p><span>License:</span> {driver.license}</p>
              <p><span>Status:</span> 
                <span className={`status ${driver.status.toLowerCase().replace(' ', '-')}`}>
                  {driver.status}
                </span>
              </p>
              <p><span>Address:</span> {driver.address}</p>
            </div>
            <div className="driver-actions">
              <button className="edit-btn" onClick={() => {
                setEditingDriver(driver);
                setShowForm(true);
              }}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(driver.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <AddDriverForm
          onClose={() => {
            setShowForm(false);
            setEditingDriver(null);
          }}
          onSave={handleSaveDriver}
          initialData={editingDriver}
        />
      )}
    </div>
  );
};

export default DriversPage;
