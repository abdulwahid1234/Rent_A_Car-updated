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
  const [editingId, setEditingId] = useState(null); // null => adding
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
    <div className="customers-page p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customers</h2>
        <button onClick={openAdd} className="bg-indigo-600 text-white px-4 py-2 rounded shadow">
          <FiUserPlus /> Add Customer
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="min-w-full table-auto customers-table">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-2 text-left">CNIC</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Granter</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="7">
                  No customers yet. Click “Add Customer” to create one.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="border-b hover:bg-slate-50">
                  <td className="p-2">{c.cnic}</td>
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.mobile}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.address}</td>
                  <td className="p-2">{c.granter}</td>
                  <td className="p-2">
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-outline" onClick={() => openEdit(c)} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => openDelete(c)} title="Delete">
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-form" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? "Edit Customer" : "Add Customer"}</h3>
              <button className="close" onClick={closeModal} aria-label="Close">
                <FiX />
              </button>
            </div>
            <form onSubmit={saveCustomer} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="md:col-span-2">
                  <label>Address</label>
                  <input
                    name="address"
                    className="input"
                    placeholder="House #, Street, City"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-2">
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

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" className="bg-gray-400 rounded shadow px-4 py-2" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="bg-indigo-600 text-white rounded shadow px-4 py-2">
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
          <div className="modal-form modal-form--sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Customer</h3>
              <button className="close" onClick={closeDelete} aria-label="Close">
                <FiX />
              </button>
            </div>
            <div className="confirm-copy">
              Are you sure you want to delete{" "}
              <strong>{customerToDelete?.name || "this customer"}</strong>?
              <div className="muted mt-2">This action cannot be undone.</div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" className="bg-gray-400 rounded shadow px-4 py-2" onClick={closeDelete}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>
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
