import React, { useState } from 'react';
import './UserSignUp.css';

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null, // store the uploaded image
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file), // Show the selected image
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password && formData.image) {
      // Here you would handle the user signup, e.g., send the data to a server
      console.log('User signed up:', formData);
      // For now, we will just reset the form
      setFormData({ name: '', email: '', password: '', image: null });
      alert('User signed up successfully!');
      <nav><Link to="/userlogin" className="nav-link">Sign In</Link></nav>
    } else {
      alert('Please fill in all fields and upload an image!');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email Address"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleInputChange}
        />

        {/* Image Upload Section */}
        <div className="image-upload">
          <label htmlFor="image-upload">Upload Profile Image</label>
          <input
            type="file"
            id="image-upload"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && <img src={formData.image} alt="Profile Preview" className="profile-preview" />}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default UserSignUp;
