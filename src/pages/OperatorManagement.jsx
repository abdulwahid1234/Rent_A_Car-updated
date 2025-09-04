import React, { useEffect, useMemo, useState } from "react";
import "./OperatorManagement.css";
import { FiEdit2, FiTrash2, FiX, FiUserPlus } from "react-icons/fi";

const LS_KEY = "operators";

const emptyOp = {
  username: "",
  email: "",
  mobile: "",
  cnic: "",
  password: "",
};

const OperatorManagement = () => {
  const [operators, setOperators] = useState([]);
  const [newOperator, setNewOperator] = useState(emptyOp);

  // edit modal
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyOp);
  const [editErrors, setEditErrors] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  // delete confirm modal
  const [toDelete, setToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    setOperators(stored);
  }, []);

  const persist = (list) => {
    setOperators(list);
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  };

  const canAdd = useMemo(() => {
    const { username, email, mobile, cnic, password } = newOperator;
    return (
      username.trim() &&
      email.trim() &&
      mobile.trim() &&
      cnic.trim() &&
      password.trim()
    );
  }, [newOperator]);

  const handleChangeNew = (e) => {
    const { name, value } = e.target;
    setNewOperator((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!canAdd) return;
    const id = Date.now();
    const updated = [...operators, { id, ...newOperator }];
    persist(updated);
    setNewOperator(emptyOp);
  };

  const openEdit = (op) => {
    setEditingId(op.id);
    setEditForm({
      username: op.username || "",
      email: op.email || "",
      mobile: op.mobile || "",
      cnic: op.cnic || "",
      password: op.password || "",
    });
    setEditErrors({});
    setShowEditModal(true);
  };

  const closeEdit = () => {
    setShowEditModal(false);
    setEditingId(null);
    setEditForm(emptyOp);
    setEditErrors({});
  };

  const validateEdit = () => {
    const er = {};
    if (!editForm.username?.trim()) er.username = "Username is required";
    if (!editForm.email?.trim()) er.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email))
      er.email = "Enter a valid email";
    if (!editForm.mobile?.trim()) er.mobile = "Mobile is required";
    if (!editForm.cnic?.trim()) er.cnic = "CNIC is required";
    if (!editForm.password?.trim()) er.password = "Password is required";
    setEditErrors(er);
    return Object.keys(er).length === 0;
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!validateEdit()) return;
    const updated = operators.map((o) =>
      o.id === editingId ? { ...o, ...editForm } : o
    );
    persist(updated);
    closeEdit();
  };

  const requestDelete = (op) => {
    setToDelete(op);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setToDelete(null);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    const updated = operators.filter((op) => op.id !== toDelete.id);
    persist(updated);
    cancelDelete();
  };

  if (role !== "admin") {
    return <p className="text-red-500 p-4">Access Denied</p>;
  }

  return (
    <div className="content">
      <div className="operator-management card">
        {/* Header */}
        <div className="section-header">
          <h2 className="page-title">Operator Management</h2>
          <span className="count-badge" aria-label="Operator count">
            {operators.length} operator{operators.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Add New Operator */}
        <div className="add-form">
          <div className="input-col">
            <label>Username</label>
            <input
              name="username"
              placeholder="Username"
              value={newOperator.username}
              onChange={handleChangeNew}
              className="input"
            />
          </div>
          <div className="input-col">
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              value={newOperator.email}
              onChange={handleChangeNew}
              className="input"
              type="email"
            />
          </div>
          <div className="input-col">
            <label>Mobile</label>
            <input
              name="mobile"
              placeholder="03xx-xxxxxxx"
              value={newOperator.mobile}
              onChange={handleChangeNew}
              className="input"
            />
          </div>
          <div className="input-col">
            <label>CNIC</label>
            <input
              name="cnic"
              placeholder="12345-6789012-3"
              value={newOperator.cnic}
              onChange={handleChangeNew}
              className="input"
            />
          </div>
          <div className="input-col">
            <label>Password</label>
            <input
              name="password"
              placeholder="Password"
              value={newOperator.password}
              onChange={handleChangeNew}
              className="input"
              type="password"
            />
          </div>

              <button
                type="button"
                className="btn btn-primary add-btn"
                onClick={handleAdd}
                disabled={!canAdd}
                aria-disabled={!canAdd}
                title="Add Operator"
              >
                <FiUserPlus /> <span>Add Operator</span>
              </button>
        </div>

        {/* Operator List */}
        <div className="operator-table table-wrap">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>CNIC</th>
                <th>Password</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {operators.map((op) => (
                <tr key={op.id}>
                  <td className="font-medium">{op.username}</td>
                  <td>{op.email}</td>
                  <td>{op.mobile}</td>
                  <td>{op.cnic}</td>
                  <td><span className="masked">••••••••</span></td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn-outline btn-sm btn-icon"
                        onClick={() => openEdit(op)}
                        title="Edit"
                        aria-label={`Edit ${op.username}`}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn btn-destructive btn-sm btn-icon"
                        onClick={() => requestDelete(op)}
                        title="Delete"
                        aria-label={`Delete ${op.username}`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {operators.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No operators found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={closeEdit}>
          <div
            className="modal-content op-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Edit Operator</h3>
              <button className="close-btn" onClick={closeEdit} aria-label="Close">
                <FiX />
              </button>
            </div>

            <form onSubmit={saveEdit}>
              <div className="grid-2 gap-16">
                <div>
                  <label>Username *</label>
                  <input
                    className={`input ${editErrors.username ? "invalid" : ""}`}
                    value={editForm.username}
                    onChange={(e) =>
                      setEditForm((s) => ({ ...s, username: e.target.value }))
                    }
                    aria-invalid={!!editErrors.username}
                  />
                  {editErrors.username && (
                    <div className="error-text">{editErrors.username}</div>
                  )}
                </div>

                <div>
                  <label>Email *</label>
                  <input
                    className={`input ${editErrors.email ? "invalid" : ""}`}
                    value={editForm.email}
                    type="email"
                    onChange={(e) =>
                      setEditForm((s) => ({ ...s, email: e.target.value }))
                    }
                    aria-invalid={!!editErrors.email}
                  />
                  {editErrors.email && (
                    <div className="error-text">{editErrors.email}</div>
                  )}
                </div>

                <div>
                  <label>Mobile *</label>
                  <input
                    className={`input ${editErrors.mobile ? "invalid" : ""}`}
                    value={editForm.mobile}
                    onChange={(e) =>
                      setEditForm((s) => ({ ...s, mobile: e.target.value }))
                    }
                    aria-invalid={!!editErrors.mobile}
                  />
                  {editErrors.mobile && (
                    <div className="error-text">{editErrors.mobile}</div>
                  )}
                </div>

                <div>
                  <label>CNIC *</label>
                  <input
                    className={`input ${editErrors.cnic ? "invalid" : ""}`}
                    value={editForm.cnic}
                    onChange={(e) =>
                      setEditForm((s) => ({ ...s, cnic: e.target.value }))
                    }
                    aria-invalid={!!editErrors.cnic}
                  />
                  {editErrors.cnic && (
                    <div className="error-text">{editErrors.cnic}</div>
                  )}
                </div>

                <div className="field-full">
                  <label>Password *</label>
                  <input
                    className={`input ${editErrors.password ? "invalid" : ""}`}
                    type="text"
                    value={editForm.password}
                    onChange={(e) =>
                      setEditForm((s) => ({ ...s, password: e.target.value }))
                    }
                    aria-invalid={!!editErrors.password}
                  />
                  {editErrors.password && (
                    <div className="error-text">{editErrors.password}</div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div
            className="modal-content op-modal-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Delete Operator</h3>
              <button className="close-btn" onClick={cancelDelete} aria-label="Close">
                <FiX />
              </button>
            </div>

            <div style={{ color: "var(--text-default)" }}>
              Are you sure you want to delete{" "}
              <strong>{toDelete?.username || "this operator"}</strong>?
              <div style={{ color: "var(--text-muted)", marginTop: 8 }}>
                This action cannot be undone.
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
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

export default OperatorManagement;
