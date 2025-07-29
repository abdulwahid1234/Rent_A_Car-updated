import React, { useEffect, useState } from "react";
import "./OperatorManagement.css";

const OperatorManagement = () => {
  const [operators, setOperators] = useState([]);
  const [newOperator, setNewOperator] = useState({
    username: "",
    email: "",
    mobile: "",
    cnic: "",
    password: ""
  });

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("operators")) || [];
    setOperators(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOperator((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const id = Date.now();
    const updated = [...operators, { id, ...newOperator }];
    setOperators(updated);
    localStorage.setItem("operators", JSON.stringify(updated));
    setNewOperator({ username: "", email: "", mobile: "", cnic: "", password: "" });
  };

  const handleDelete = (id) => {
    const updated = operators.filter((op) => op.id !== id);
    setOperators(updated);
    localStorage.setItem("operators", JSON.stringify(updated));
  };

  if (role !== "admin") return <p className="text-red-500 p-4">Access Denied</p>;

  return (
    <div className="operator-management">
      <h2>Operator Management</h2>

      {/* Add New Operator */}
      <div className="add-form">
        <input name="username" placeholder="Username" value={newOperator.username} onChange={handleChange} />
        <input name="email" placeholder="Email" value={newOperator.email} onChange={handleChange} />
        <input name="mobile" placeholder="Mobile" value={newOperator.mobile} onChange={handleChange} />
        <input name="cnic" placeholder="CNIC" value={newOperator.cnic} onChange={handleChange} />
        <input name="password" placeholder="Password" value={newOperator.password} onChange={handleChange} />
        <button onClick={handleAdd}>Add Operator</button>
      </div>

      {/* Operator List */}
      <div className="operator-table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>CNIC</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {operators.map((op) => (
              <tr key={op.id}>
                <td>{op.username}</td>
                <td>{op.email}</td>
                <td>{op.mobile}</td>
                <td>{op.cnic}</td>
                <td>{op.password}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(op.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {operators.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#ccc" }}>No operators found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OperatorManagement;
