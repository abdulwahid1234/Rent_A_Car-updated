import React, { useEffect, useState } from "react";
import "./Settings.css";

const DEFAULT_SETTINGS = {
  name: "Admin User",
  email: "admin@rentacar.com",
  password: "",
  notifications: true,
  darkMode: false,
};

const SettingsPage = () => {
  const [profile, setProfile] = useState(DEFAULT_SETTINGS);
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("app_settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setProfile({ ...DEFAULT_SETTINGS, ...parsed });
      } catch {
        // ignore parsing errors, keep defaults
      }
    }
  }, []);

  // (Optional) Apply dark mode to <body> as a side effect
  useEffect(() => {
    if (profile.darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [profile.darkMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("app_settings", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    setProfile(DEFAULT_SETTINGS);
  };

  return (
    <div className="settings-wrap">
      <div className="settings-container">
        <h2>Settings</h2>

        {/* Profile */}
        <section className="settings-section">
          <div className="section-head">
            <h3>👤 Profile Information</h3>
            <span className="section-sub">Manage your account details</span>
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="field full">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <small className="hint">
                Use 8+ characters with a mix of letters, numbers & symbols.
              </small>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="settings-section">
          <div className="section-head">
            <h3>⚙️ Preferences</h3>
            <span className="section-sub">Customize how the app behaves</span>
          </div>

          <div className="prefs-grid">
            <label className="switch-row">
              <div className="switch-copy">
                <span className="switch-title">Enable Notifications</span>
                <span className="switch-sub">Receive booking and system alerts</span>
              </div>
              <span className="switch">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={profile.notifications}
                  onChange={handleChange}
                />
                <span className="slider" />
              </span>
            </label>

            <label className="switch-row">
              <div className="switch-copy">
                <span className="switch-title">Enable Dark Mode</span>
                <span className="switch-sub">Switch to the dark theme</span>
              </div>
              <span className="switch">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={profile.darkMode}
                  onChange={handleChange}
                />
                <span className="slider" />
              </span>
            </label>
          </div>
        </section>

        {/* Actions */}
        <div className="actions">
          <button className="btn btn-outline" type="button" onClick={handleReset}>
            Reset to Defaults
          </button>
          <button className="btn btn-primary" type="button" onClick={handleSave}>
            {saved ? "Saved ✓" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
