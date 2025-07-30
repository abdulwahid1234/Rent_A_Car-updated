import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.jsx";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operator");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lastUsername = sessionStorage.getItem("username");
    const lastRole = sessionStorage.getItem("role");
    if (lastUsername) setUsername(lastUsername);
    if (lastRole) setRole(lastRole);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (role === "admin") {
        if (username === "admin" && password === "admin") {
          sessionStorage.setItem("username", "admin");
          sessionStorage.setItem("role", "admin");
          sessionStorage.setItem("email", "admin@example.com");
          sessionStorage.setItem("profileImage", `https://ui-avatars.com/api/?name=admin`);
          sessionStorage.setItem("mobile", "03001234567");
          sessionStorage.setItem("cnic", "12345-6789012-3");
          sessionStorage.setItem("password", password);
          login("fake-token");
          navigate("/");
        } else {
          toast.error("Invalid Admin Credentials");
        }
      } else if (role === "operator") {
        const operators = JSON.parse(localStorage.getItem("operators")) || [];
        const found = operators.find(
          (op) => op.username === username && op.password === password
        );

        if (found) {
          sessionStorage.setItem("username", found.username);
          sessionStorage.setItem("role", "operator");
          sessionStorage.setItem("email", found.email || `${found.username}@example.com`);
          sessionStorage.setItem("profileImage", found.profileImage || `https://ui-avatars.com/api/?name=${found.username}`);
          sessionStorage.setItem("mobile", found.mobile || "");
          sessionStorage.setItem("cnic", found.cnic || "");
          sessionStorage.setItem("password", found.password);
          login("fake-token");
          navigate("/");
        } else {
          toast.error("Invalid Operator Credentials");
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="operator">Operator</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="text-right text-sm mb-4">
          <button
            type="button"
            onClick={() => toast("Please contact admin to reset your password.")}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>For Admin: admin , admin</p>
      <p>For Operator: Akbar, akbar</p>
      </form>
      
    </div>
  );
};

export default Login;
