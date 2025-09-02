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
    const storedEmail =
      sessionStorage.getItem("email") ||
      `${storedUsername.toLowerCase()}@example.com`;
    const storedImage =
      sessionStorage.getItem("profileImage") ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(storedUsername)}`;
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
      const currentSessionUsername = sessionStorage.getItem("username") || "User";

      const updatedOperators = storedOperators.map((op) =>
        op.username === currentSessionUsername
          ? { ...op, username, email, mobile, cnic, password }
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
    setPassword(newPassword);
    setShowPasswordForm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-card">
        <img src={profileImage} alt="User avatar" className="profile-image" />

        <div className="profile-info">
          <div className="profile-field">
            <label>Username</label>
            {isEditing ? (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            ) : (
              <p>{username}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Email</label>
            {isEditing ? (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            ) : (
              <p>{email}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Mobile</label>
            {isEditing ? (
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+92 3xx xxxxxxx"
              />
            ) : (
              <p>{mobile || "-"}</p>
            )}
          </div>

          <div className="profile-field">
            <label>CNIC</label>
            {isEditing ? (
              <input
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="xxxxx-xxxxxxx-x"
              />
            ) : (
              <p>{cnic || "-"}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Password</label>
            {isEditing ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            ) : (
              <p className="truncate">••••••••</p>
            )}
          </div>

          {/* Replace Profile Image URL input with File input */}
          <div className="profile-field">
            <label>Profile Image</label>
            {isEditing ? (
              <>
                <input type="file" onChange={handleImageChange} />
                {profileImage && (
                  <img src={profileImage} alt="Selected Profile" style={{ width: 100, height: 100, marginTop: 10 }} />
                )}
              </>
            ) : (
              <p className="truncate">{profileImage}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Role</label>
            <p className="capitalize">{role}</p>
          </div>

          {isEditing ? (
            <div className="profile-actions">
              <button onClick={handleSave} className="btn-save">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn-cancel"
                type="button"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="profile-actions">
              <button onClick={() => setIsEditing(true)} className="btn-edit">
                Edit Profile
              </button>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="btn-password"
              >
                Change Password
              </button>
            </div>
          )}
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className="change-password-form">
            <h3>Change Password</h3>
            <label>
              Old Password
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </label>
            <label>
              New Password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <div className="password-actions">
              <button type="submit" className="btn-save">
                Update
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
