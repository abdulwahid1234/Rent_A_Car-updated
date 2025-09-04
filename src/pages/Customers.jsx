import React, { useEffect, useState } from "react";
import "./Customers.css";
import { FiEdit2, FiTrash2, FiUserPlus, FiX } from "react-icons/fi";

const emptyForm = {
  cnic: "",
  name: "",
  mobile: "",
  email: "",
  address: "",
  granter: "",
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(stored);
  }, []);

  const persist = (list) => {
    setCustomers(list);
    localStorage.setItem("customers", JSON.stringify(list));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (cust) => {
    setEditingId(cust.id);
    setForm({
      cnic: cust.cnic || "",
      name: cust.name || "",
      mobile: cust.mobile || "",
      email: cust.email || "",
      address: cust.address || "",
      granter: cust.granter || "",
    });
    setErrors({});
    setShowModal(true);
  };

  const openDelete = (cust) => {
    setCustomerToDelete(cust);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  };

  const closeDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.cnic?.trim()) er.cnic = "CNIC is required";
    if (!form.name?.trim()) er.name = "Name is required";
    if (!form.mobile?.trim()) er.mobile = "Mobile is required";
    if (!form.email?.trim()) er.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      er.email = "Enter a valid email";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const saveCustomer = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      const updated = customers.map((c) =>
        c.id === editingId ? { ...c, ...form } : c
      );
      persist(updated);
    } else {
      const newCust = { id: Date.now(), ...form };
      persist([...customers, newCust]);
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (!customerToDelete) return;
    persist(customers.filter((c) => c.id !== customerToDelete.id));
    closeDelete();
  };

  return (
    <div className="content">
      {/* Top card */}
      <div className="card">
        <div className="section-header">
          <h2 className="page-title">Customers</h2>
          <button onClick={openAdd} className="btn btn-primary">
            <FiUserPlus /> <span>Add Customer</span>
          </button>
        </div>

        {/* Table */}
        <div className="table-wrap">
          <table className="customers-table">
            <thead>
              <tr>
                <th>CNIC</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Address</th>
                <th>Granter</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: 16, color: "var(--text-muted)" }}>
                    No customers yet. Click “Add Customer” to create one.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id}>
                    <td className="font-medium">{c.cnic}</td>
                    <td>{c.name}</td>
                    <td>{c.mobile}</td>
                    <td>{c.email}</td>
                    <td>{c.address}</td>
                    <td>{c.granter}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="btn btn-outline btn-sm btn-icon"
                          onClick={() => openEdit(c)}
                          title="Edit"
                          aria-label={`Edit ${c.name}`}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="btn btn-destructive btn-sm btn-icon"
                          onClick={() => openDelete(c)}
                          title="Delete"
                          aria-label={`Delete ${c.name}`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content customers-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? "Edit Customer" : "Add Customer"}</h3>
              <button className="close-btn" onClick={closeModal} aria-label="Close">
                <FiX />
              </button>
            </div>

            <form onSubmit={saveCustomer}>
              <div className="grid-2 gap-16">
                <div>
                  <label>CNIC *</label>
                  <input
                    name="cnic"
                    className={`input ${errors.cnic ? "invalid" : ""}`}
                    placeholder="12345-6789012-3"
                    value={form.cnic}
                    onChange={handleChange}
                    aria-invalid={!!errors.cnic}
                  />
                  {errors.cnic && <div className="error-text">{errors.cnic}</div>}
                </div>
                <div>
                  <label>Name *</label>
                  <input
                    name="name"
                    className={`input ${errors.name ? "invalid" : ""}`}
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <div className="error-text">{errors.name}</div>}
                </div>

                <div>
                  <label>Mobile *</label>
                  <input
                    name="mobile"
                    className={`input ${errors.mobile ? "invalid" : ""}`}
                    placeholder="03xx-xxxxxxx"
                    value={form.mobile}
                    onChange={handleChange}
                    aria-invalid={!!errors.mobile}
                  />
                  {errors.mobile && <div className="error-text">{errors.mobile}</div>}
                </div>
                <div>
                  <label>Email *</label>
                  <input
                    name="email"
                    type="email"
                    className={`input ${errors.email ? "invalid" : ""}`}
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <div className="error-text">{errors.email}</div>}
                </div>

                <div className="field-full">
                  <label>Address</label>
                  <input
                    name="address"
                    className="input"
                    placeholder="House #, Street, City"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-full">
                  <label>Granter</label>
                  <input
                    name="granter"
                    className="input"
                    placeholder="Reference / Guarantor"
                    value={form.granter}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Save Changes" : "Add Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDelete}>
          <div className="modal-content customers-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Customer</h3>
              <button className="close-btn" onClick={closeDelete} aria-label="Close">
                <FiX />
              </button>
            </div>

            <div style={{ color: "var(--text-default)" }}>
              Are you sure you want to delete{" "}
              <strong>{customerToDelete?.name || "this customer"}</strong>?
              <div style={{ color: "var(--text-muted)", marginTop: 8 }}>
                This action cannot be undone.
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeDelete}>
                Cancel
              </button>
              <button type="button" className="btn btn-destructive" onClick={confirmDelete}>
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
