import React, { useState, useEffect } from "react";
import "./UserSignUp.css";

const UserSignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Force light background for this page only
  useEffect(() => {
    document.body.classList.add("light-surface");
    return () => document.body.classList.remove("light-surface");
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      if (errors.imageUrl) setErrors((er) => ({ ...er, imageUrl: "" }));
    }
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Full name is required";
    if (!form.email.trim()) er.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Enter a valid email";
    if (!form.password) er.password = "Password is required";
    else if (form.password.length < 6) er.password = "At least 6 characters";
    if (!form.confirmPassword) er.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password) er.confirmPassword = "Passwords do not match";
    if (!form.imageUrl) er.imageUrl = "Please upload a profile image";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({
        id: Date.now(),
        name: form.name,
        email: form.email,
        password: form.password, // demo only; don’t store raw passwords in production
        imageUrl: form.imageUrl,
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("User signed up successfully!");
      window.location.href = "/userlogin";
    } catch {
      alert("Sign up failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create your account</h2>
        <p className="subtitle">Join us to manage your rentals with ease.</p>

        <form className="signup-form" onSubmit={onSubmit} noValidate>
          <div className="avatar-row">
            <div className="avatar">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="Profile preview" />
              ) : (
                <span className="avatar-placeholder" aria-hidden>👤</span>
              )}
            </div>
            <div className="file-wrap">
              <label htmlFor="image-upload" className="file-label">Upload profile image</label>
              <input id="image-upload" type="file" accept="image/*" onChange={onImageChange} />
              {errors.imageUrl && <div className="error-text">{errors.imageUrl}</div>}
            </div>
          </div>

          <label>Full Name</label>
          <input
            className={errors.name ? "input error" : "input"}
            type="text"
            name="name"
            value={form.name}
            placeholder="Jane Doe"
            onChange={onChange}
            autoComplete="name"
          />
          {errors.name && <div className="error-text">{errors.name}</div>}

          <label>Email</label>
          <input
            className={errors.email ? "input error" : "input"}
            type="email"
            name="email"
            value={form.email}
            placeholder="you@example.com"
            onChange={onChange}
            autoComplete="email"
          />
          {errors.email && <div className="error-text">{errors.email}</div>}

          <label>Password</label>
          <input
            className={errors.password ? "input error" : "input"}
            type="password"
            name="password"
            value={form.password}
            placeholder="••••••••"
            onChange={onChange}
            autoComplete="new-password"
          />
          {errors.password && <div className="error-text">{errors.password}</div>}

          <label>Confirm Password</label>
          <input
            className={errors.confirmPassword ? "input error" : "input"}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            placeholder="••••••••"
            onChange={onChange}
            autoComplete="new-password"
          />
          {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="helper-row">
          Already have an account? <a href="/userlogin">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
