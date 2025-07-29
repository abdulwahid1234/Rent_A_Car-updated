import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import "./Signup.css";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [role, setRole] = useState("operator");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (username && password) {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("profileImage", profileImage || `https://ui-avatars.com/api/?name=${username}`);
      sessionStorage.setItem("email", `${username}@example.com`);
      signup("fake-token");
      navigate("/");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Profile Image URL (optional)"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="operator">Operator</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Create Account</button>
        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;