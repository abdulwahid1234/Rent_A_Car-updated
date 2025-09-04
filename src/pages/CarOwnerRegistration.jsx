import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import {
  FaCar, FaCalendarAlt, FaPalette, FaUser, FaIdCard, FaPhone,
  FaMapMarkerAlt, FaDollarSign, FaSearch, FaEdit, FaTrash, FaTimes, FaSave
} from "react-icons/fa";
import "./CarOwnerRegistration.css";

const LS_KEY = "cars_db";

const loadCars = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
};
const saveCars = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

const CarOwnerRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [cars, setCars] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const data = loadCars();
    setCars(data);
    setTableLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      car: {
        make: "", model: "", year: "", registrationNo: "",
        engineNo: "", color: "", ratePerDay: "", status: "Available",
      },
      owner: {
        name: "", cnic: "", contact: "", address: "",
        ownershipType: "Owned", revenueShare: "",
      },
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const record = {
          _id: (typeof crypto !== "undefined" && crypto.randomUUID)
            ? crypto.randomUUID() : String(Date.now()),
          car: { ...values.car },
          owner: { ...values.owner },
          createdAt: new Date().toISOString(),
        };
        const next = [record, ...cars];
        setCars(next);
        saveCars(next);
        toast.success("Car & Owner saved locally!");
        resetForm();
        setShowForm(false);
      } catch {
        toast.error("Could not save locally.");
      } finally { setLoading(false); }
    },
  });

  const { values, handleChange, handleSubmit } = formik;

  const openForm = () => {
    setShowForm(true);
    setTimeout(() => formRef.current?.focus(), 0);
  };
  const closeForm = () => setShowForm(false);

  const filteredCars = cars.filter((item) => {
    const { car = {}, owner = {} } = item || {};
    const hay = `${car.make ?? ""} ${car.model ?? ""} ${car.registrationNo ?? ""} ${owner.name ?? ""}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  const handleDelete = (id) => {
    if (!id) return;
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    const next = cars.filter((c) => c._id !== id);
    setCars(next);
    saveCars(next);
    toast.success("Deleted.");
    if (editing && editing._id === id) setEditing(null);
  };

  const handleEditOpen = (record) => {
    if (!record) return;
    setEditing(JSON.parse(JSON.stringify(record)));
  };
  const handleEditChange = (path, value) => {
    setEditing((prev) => {
      if (!prev) return prev;
      const next = { ...prev, car: { ...prev.car }, owner: { ...prev.owner } };
      const [section, field] = path.split(".");
      next[section][field] = value;
      return next;
    });
  };
  const handleEditSave = () => {
    if (!editing) return;
    const req = [
      editing.car.make, editing.car.model, editing.car.registrationNo,
      editing.owner.name, editing.owner.contact
    ];
    if (req.some((v) => !String(v || "").trim())) {
      toast.error("Please fill required fields (Make, Model, Reg#, Owner Name, Contact).");
      return;
    }
    const next = cars.map((c) => (c._id === editing._id ? editing : c));
    setCars(next);
    saveCars(next);
    toast.success("Changes saved.");
    setEditing(null);
  };
  const handleEditCancel = () => setEditing(null);

  return (
    <div className="content">
      <Toaster />

      {/* Top card: title + actions */}
      <div className="card shadow-md">
        <div className="section-header">
          <h2 className="page-title">Car & Owner Registration</h2>
          <div className="top-actions">
            <div className="search-inline">
              <FaSearch className="search-inline-icon" aria-hidden />
              <input
                className="input"
                type="text"
                placeholder="Search make, model, reg#, owner…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="button" onClick={openForm} className="btn btn-primary">
              <FaCar /> <span>Register Car & Owner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="card shadow-md" style={{ marginTop: 16 }}>
        <div className="table-wrap">
          <div className="table-head-row">
            <h3 className="table-title">Registered Cars</h3>
          </div>

          {tableLoading ? (
            <div className="table-empty">Loading cars…</div>
          ) : filteredCars.length === 0 ? (
            <div className="table-empty">No cars found.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Reg. No</th>
                  <th>Color</th>
                  <th>Rate/Day</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Contact</th>
                  <th>Ownership</th>
                  <th>Revenue %</th>
                  <th style={{ width: 100 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((item) => {
                  const c = item.car || {};
                  const o = item.owner || {};
                  return (
                    <tr key={item._id}>
                      <td className="font-medium">{c.make}</td>
                      <td>{c.model}</td>
                      <td>{c.year}</td>
                      <td>{c.registrationNo}</td>
                      <td>{c.color}</td>
                      <td>{c.ratePerDay}</td>
                      <td>
                        <span
                          className={`status-pill ${
                            String(c.status || "Available")
                              .toLowerCase().replace(/\s+/g, "-")
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td>{o.name}</td>
                      <td>{o.contact}</td>
                      <td>{o.ownershipType}</td>
                      <td>{o.revenueShare}</td>
                      <td>
                        <div className="row-actions">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline"
                            title="Edit"
                            onClick={() => handleEditOpen(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-destructive"
                            title="Delete"
                            onClick={() => handleDelete(item._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* === Add Form as Modal (like your screenshot) === */}
      {showForm && (
        <div className="modal-overlay modal-blur" onClick={closeForm}>
          <div
            className="modal-content modal-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="carOwnerModalTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header1">
              <h3 id="carOwnerModalTitle">Register Car &amp; Owner</h3>
              <button className="close-btn" onClick={closeForm} aria-label="Close">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* CAR (two columns) */}
                <div className="modal-section-title">Car</div>
                <div className="grid-two">
                  <label className="field">
                    <span>Make *</span>
                    <input
                      ref={formRef}
                      className="input"
                      name="car.make"
                      value={values.car.make}
                      onChange={handleChange}
                      placeholder="e.g. Toyota"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>Model *</span>
                    <input
                      className="input"
                      name="car.model"
                      value={values.car.model}
                      onChange={handleChange}
                      placeholder="e.g. Corolla"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>Year</span>
                    <input
                      className="input"
                      type="number"
                      name="car.year"
                      value={values.car.year}
                      onChange={handleChange}
                      placeholder="2020"
                    />
                  </label>
                  <label className="field">
                    <span>Registration No *</span>
                    <input
                      className="input"
                      name="car.registrationNo"
                      value={values.car.registrationNo}
                      onChange={handleChange}
                      placeholder="ABC-123"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>Engine No</span>
                    <input
                      className="input"
                      name="car.engineNo"
                      value={values.car.engineNo}
                      onChange={handleChange}
                      placeholder="Engine #"
                    />
                  </label>
                  <label className="field">
                    <span>Color</span>
                    <input
                      className="input"
                      name="car.color"
                      value={values.car.color}
                      onChange={handleChange}
                      placeholder="White"
                    />
                  </label>
                  <label className="field">
                    <span>Rate / Day</span>
                    <input
                      className="input"
                      type="number"
                      name="car.ratePerDay"
                      value={values.car.ratePerDay}
                      onChange={handleChange}
                      placeholder="5000"
                    />
                  </label>
                  <label className="field">
                    <span>Status</span>
                    <select
                      className="input"
                      name="car.status"
                      value={values.car.status}
                      onChange={handleChange}
                    >
                      <option>Available</option>
                      <option>Unavailable</option>
                      <option>Under Maintenance</option>
                    </select>
                  </label>
                </div>

                {/* OWNER (two columns) */}
                <div className="modal-section-title" style={{ marginTop: 8 }}>Owner</div>
                <div className="grid-two">
                  <label className="field">
                    <span>Name *</span>
                    <input
                      className="input"
                      name="owner.name"
                      value={values.owner.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>CNIC</span>
                    <input
                      className="input"
                      name="owner.cnic"
                      value={values.owner.cnic}
                      onChange={handleChange}
                      placeholder="12345-6789012-3"
                    />
                  </label>
                  <label className="field">
                    <span>Contact *</span>
                    <input
                      className="input"
                      name="owner.contact"
                      value={values.owner.contact}
                      onChange={handleChange}
                      placeholder="03xx-xxxxxxx"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>Email</span>
                    <input
                      className="input"
                      type="email"
                      name="owner.email"
                      value={values.owner.email || ""}
                      onChange={handleChange}
                      placeholder="name@example.com"
                    />
                  </label>
                  <label className="field field-full">
                    <span>Address</span>
                    <input
                      className="input"
                      name="owner.address"
                      value={values.owner.address}
                      onChange={handleChange}
                      placeholder="House #, Street, City"
                    />
                  </label>
                  <label className="field">
                    <span>Ownership Type</span>
                    <select
                      className="input"
                      name="owner.ownershipType"
                      value={values.owner.ownershipType}
                      onChange={handleChange}
                    >
                      <option>Owned</option>
                      <option>Leased</option>
                    </select>
                  </label>
                  <label className="field">
                    <span>Revenue %</span>
                    <input
                      className="input"
                      type="number"
                      name="owner.revenueShare"
                      value={values.owner.revenueShare}
                      onChange={handleChange}
                      placeholder="e.g. 70"
                    />
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving…" : "Register Car & Owner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === Edit (kept as your existing centered modal) === */}
      {editing && (
        <div className="modal-overlay" onClick={handleEditCancel}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header1">
              <h3>Edit Car & Owner</h3>
              <button className="close-btn" onClick={handleEditCancel} aria-label="Close">
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="edit-grid">
                <div className="edit-group">
                  <h4>Car</h4>
                  <div className="grid-2">
                    <label>Make
                      <input className="input" value={editing.car.make || ""} onChange={(e) => handleEditChange("car.make", e.target.value)} />
                    </label>
                    <label>Model
                      <input className="input" value={editing.car.model || ""} onChange={(e) => handleEditChange("car.model", e.target.value)} />
                    </label>
                    <label>Year
                      <input className="input" type="number" value={editing.car.year || ""} onChange={(e) => handleEditChange("car.year", e.target.value)} />
                    </label>
                    <label>Reg. No
                      <input className="input" value={editing.car.registrationNo || ""} onChange={(e) => handleEditChange("car.registrationNo", e.target.value)} />
                    </label>
                    <label>Engine No
                      <input className="input" value={editing.car.engineNo || ""} onChange={(e) => handleEditChange("car.engineNo", e.target.value)} />
                    </label>
                    <label>Color
                      <input className="input" value={editing.car.color || ""} onChange={(e) => handleEditChange("car.color", e.target.value)} />
                    </label>
                    <label>Rate/Day
                      <input className="input" type="number" value={editing.car.ratePerDay || ""} onChange={(e) => handleEditChange("car.ratePerDay", e.target.value)} />
                    </label>
                    <label>Status
                      <select className="input" value={editing.car.status || "Available"} onChange={(e) => handleEditChange("car.status", e.target.value)}>
                        <option>Available</option>
                        <option>Unavailable</option>
                        <option>Under Maintenance</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="edit-group">
                  <h4>Owner</h4>
                  <div className="grid-2">
                    <label>Name
                      <input className="input" value={editing.owner.name || ""} onChange={(e) => handleEditChange("owner.name", e.target.value)} />
                    </label>
                    <label>CNIC
                      <input className="input" value={editing.owner.cnic || ""} onChange={(e) => handleEditChange("owner.cnic", e.target.value)} />
                    </label>
                    <label>Contact
                      <input className="input" value={editing.owner.contact || ""} onChange={(e) => handleEditChange("owner.contact", e.target.value)} />
                    </label>
                    <label>Address
                      <input className="input" value={editing.owner.address || ""} onChange={(e) => handleEditChange("owner.address", e.target.value)} />
                    </label>
                    <label>Ownership Type
                      <select className="input" value={editing.owner.ownershipType || "Owned"} onChange={(e) => handleEditChange("owner.ownershipType", e.target.value)}>
                        <option>Owned</option>
                        <option>Leased</option>
                      </select>
                    </label>
                    <label>Revenue %
                      <input className="input" type="number" value={editing.owner.revenueShare || ""} onChange={(e) => handleEditChange("owner.revenueShare", e.target.value)} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={handleEditCancel}>Cancel</button>
              <button className="btn btn-primary" onClick={handleEditSave}>
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarOwnerRegistration;
