import React, { useState } from "react";
import "./UserLogin.css";

const UserLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please fill in both email and password.");
      return;
    }
    try {
      setSubmitting(true);

      // Simulated login
      // In a real app, call your API here and handle tokens/redirects.
      // Example: await axios.post('/api/login', form);
      sessionStorage.setItem("email", form.email);
      sessionStorage.setItem("username", form.email.split("@")[0] || "User");
      sessionStorage.setItem("role", "operator"); // or set based on API response

      alert("Logged in successfully!");
      // navigate('/dashboard')  <-- if using React Router
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <p className="subtitle">
          Welcome back! Enter your credentials to access your dashboard.
        </p>

        <form className="login-form" onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="you@example.com"
            onChange={onChange}
            autoComplete="email"
          />

          <label>Password</label>
          <div className="password-wrap">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              placeholder="••••••••"
              onChange={onChange}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="helper-row">
          <a href="#forgot" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
          <span>•</span>
          <a href="#signup" onClick={(e) => e.preventDefault()}>
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
