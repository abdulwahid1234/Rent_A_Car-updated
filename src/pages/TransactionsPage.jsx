import React, { useEffect, useMemo, useState } from "react";
import "./Transactions.css";

const TransactionsPage = () => {
  // Load from localStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    id: null,
    vehicleName: "",
    income: "",
    expense: "",
    description: "",
    date: "",
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const isEditing = form.id !== null;

  const isValid = useMemo(() => {
    const { vehicleName, income, expense, description, date } = form;
    const hasAll =
      vehicleName.trim() &&
      description.trim() &&
      date &&
      income !== "" &&
      expense !== "";
    return hasAll && !Number.isNaN(+income) && !Number.isNaN(+expense);
  }, [form]);

  // Helpers
  const resetForm = () =>
    setForm({
      id: null,
      vehicleName: "",
      income: "",
      expense: "",
      description: "",
      date: "",
    });

  const formatRs = (n) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(Number(n || 0));

  // Add or Save
  const handleSubmit = () => {
    if (!isValid) return;

    const payload = {
      ...form,
      id: isEditing ? form.id : Date.now(),
      income: +form.income,
      expense: +form.expense,
      profitLoss: +form.income - +form.expense,
    };

    if (isEditing) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === form.id ? payload : t))
      );
    } else {
      setTransactions((prev) => [...prev, payload]);
    }
    resetForm();
  };

  // Edit
  const startEditing = (t) =>
    setForm({
      id: t.id,
      vehicleName: t.vehicleName,
      income: t.income,
      expense: t.expense,
      description: t.description,
      date: t.date,
    });

  // Delete
  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="transactions">
      <h2>Transaction History</h2>

      {/* Form Card */}
      <div className="tx-form">
        <div className="tx-form__header">
          <h3>{isEditing ? "Edit Transaction" : "Add New Transaction"}</h3>
          {isEditing && (
            <button className="btn btn-ghost" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>

        <div className="tx-form__grid">
          <div className="field">
            <label>Vehicle Name</label>
            <input
              type="text"
              value={form.vehicleName}
              onChange={(e) => setForm({ ...form, vehicleName: e.target.value })}
              placeholder="e.g., Honda Civic"
            />
          </div>

          <div className="field">
            <label>Income (Rs)</label>
            <input
              type="number"
              value={form.income}
              onChange={(e) => setForm({ ...form, income: e.target.value })}
              placeholder="e.g., 12000"
              min="0"
            />
          </div>

          <div className="field">
            <label>Expense (Rs)</label>
            <input
              type="number"
              value={form.expense}
              onChange={(e) => setForm({ ...form, expense: e.target.value })}
              placeholder="e.g., 3000"
              min="0"
            />
          </div>

          <div className="field">
            <label>Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="e.g., Maintenance"
            />
          </div>

          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </div>

        <div className="tx-form__actions">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            {isEditing ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="tx-table">
        <table>
          <thead>
            <tr>
              <th>Vehicle Name</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Profit/Loss</th>
              <th>Description</th>
              <th>Date</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.vehicleName}</td>
                <td>{formatRs(t.income)}</td>
                <td>{formatRs(t.expense)}</td>
                <td className={t.profitLoss < 0 ? "neg" : "pos"}>
                  {formatRs(t.profitLoss)}
                </td>
                <td>{t.description}</td>
                <td>{t.date}</td>
                <td className="actions">
                  <button className="btn btn-outline" onClick={() => startEditing(t)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTransaction(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="7" className="empty">
                  No transactions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
