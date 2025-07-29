import React, { useState } from 'react';
import './Settings.css';

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@rentacar.com',
    password: '',
    notifications: true,
    darkMode: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>👤 Profile Information</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </label>
      </div>

      <div className="settings-section">
        <h3>⚙️ Preferences</h3>
        <label className="checkbox">
          <input
            type="checkbox"
            name="notifications"
            checked={profile.notifications}
            onChange={handleChange}
          />
          Enable Notifications
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            name="darkMode"
            checked={profile.darkMode}
            onChange={handleChange}
          />
          Enable Dark Mode
        </label>
      </div>

      <button className="save-btn" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default SettingsPage;
