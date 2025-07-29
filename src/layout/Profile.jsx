import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [mobile, setMobile] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");

  const role = sessionStorage.getItem("role") || "operator";

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username") || "User";
    const storedEmail = sessionStorage.getItem("email") || `${storedUsername.toLowerCase()}@example.com`;
    const storedImage = sessionStorage.getItem("profileImage") || `https://ui-avatars.com/api/?name=${storedUsername}`;
    const storedMobile = sessionStorage.getItem("mobile") || "";
    const storedCnic = sessionStorage.getItem("cnic") || "";
    const storedPassword = sessionStorage.getItem("password") || "";

    setUsername(storedUsername);
    setEmail(storedEmail);
    setProfileImage(storedImage);
    setMobile(storedMobile);
    setCnic(storedCnic);
    setPassword(storedPassword);
  }, []);

  const handleSave = () => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("profileImage", profileImage);
    sessionStorage.setItem("mobile", mobile);
    sessionStorage.setItem("cnic", cnic);
    sessionStorage.setItem("password", password);

    if (role === "operator") {
      const storedOperators = JSON.parse(localStorage.getItem("operators")) || [];

      const updatedOperators = storedOperators.map((op) =>
        op.username === sessionStorage.getItem("username")
          ? {
              ...op,
              username,
              email,
              mobile,
              cnic,
              password
            }
          : op
      );

      localStorage.setItem("operators", JSON.stringify(updatedOperators));
    }

    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Simulated password change
    alert("Password changed successfully (simulated)");
    setOldPassword("");
    setNewPassword("");
    setPassword(newPassword); // update in profile
    setShowPasswordForm(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <img src={profileImage} alt="User" className="profile-image" />

        <div className="profile-info">
          <div className="profile-field">
            <label>Username:</label>
            {isEditing ? (
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
            ) : (
              <p>{username}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Email:</label>
            {isEditing ? (
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <p>{email}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Mobile:</label>
            {isEditing ? (
              <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
            ) : (
              <p>{mobile}</p>
            )}
          </div>

          <div className="profile-field">
            <label>CNIC:</label>
            {isEditing ? (
              <input value={cnic} onChange={(e) => setCnic(e.target.value)} />
            ) : (
              <p>{cnic}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Password:</label>
            {isEditing ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <p className="truncate">••••••••</p>
            )}
          </div>

          <div className="profile-field">
            <label>Profile Image URL:</label>
            {isEditing ? (
              <input value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
            ) : (
              <p className="truncate">{profileImage}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Role:</label>
            <p className="capitalize">{role}</p>
          </div>

          {isEditing ? (
            <div className="profile-actions">
              <button onClick={handleSave} className="btn-save">Save</button>
              <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
            </div>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="btn-edit">Edit Profile</button>
              <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="btn-password">Change Password</button>
            </>
          )}
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className="change-password-form">
            <h3>Change Password</h3>
            <label>
              Old Password:
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </label>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <div className="password-actions">
              <button type="submit" className="btn-save">Update</button>
              <button type="button" className="btn-cancel" onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
