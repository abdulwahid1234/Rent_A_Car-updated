import React, { useState, useEffect } from 'react';
import './Transactions.css';

const TransactionsPage = () => {
  // Fetch transactions from localStorage or set to an empty array if not found
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [newTransaction, setNewTransaction] = useState({
    id: '',
    vehicleName: '',
    income: '',
    expense: '',
    description: '',
    date: ''
  });

  const [editTransaction, setEditTransaction] = useState(null);

  // Update the localStorage whenever the transactions state changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = () => {
    if (!newTransaction.vehicleName || !newTransaction.income || !newTransaction.expense || !newTransaction.description || !newTransaction.date) {
      alert("Please fill in all fields");
      return;
    }

    setTransactions((prevTransactions) => {
      const updatedTransactions = [
        ...prevTransactions,
        { 
          ...newTransaction, 
          id: Date.now(),
          profitLoss: newTransaction.income - newTransaction.expense // Calculating profit/loss
        }
      ];
      return updatedTransactions;
    });

    setNewTransaction({ id: '', vehicleName: '', income: '', expense: '', description: '', date: '' });
  };

  // Edit an existing transaction
  const startEditing = (transaction) => {
    setEditTransaction(transaction);
    setNewTransaction({
      vehicleName: transaction.vehicleName,
      income: transaction.income,
      expense: transaction.expense,
      description: transaction.description,
      date: transaction.date
    });
  };

  // Save the edited transaction
  const saveEditedTransaction = () => {
    if (!newTransaction.vehicleName || !newTransaction.income || !newTransaction.expense || !newTransaction.description || !newTransaction.date) {
      alert("Please fill in all fields");
      return;
    }

    setTransactions((prevTransactions) =>
      prevTransactions.map((t) =>
        t.id === editTransaction.id ? { ...t, ...newTransaction, profitLoss: newTransaction.income - newTransaction.expense } : t
      )
    );

    setEditTransaction(null);
    setNewTransaction({ id: '', vehicleName: '', income: '', expense: '', description: '', date: '' });
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) => prevTransactions.filter((t) => t.id !== id));
  };

  return (
    <div className="transactions-container">
      <h2>Transaction History – July 2024</h2>

      <div className="transaction-form">
        <h3>{editTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
        <input
          type="text"
          placeholder="Vehicle Name"
          value={newTransaction.vehicleName}
          onChange={(e) => setNewTransaction({ ...newTransaction, vehicleName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Income (Rs)"
          value={newTransaction.income}
          onChange={(e) => setNewTransaction({ ...newTransaction, income: parseInt(e.target.value, 10) })}
        />
        <input
          type="number"
          placeholder="Expense (Rs)"
          value={newTransaction.expense}
          onChange={(e) => setNewTransaction({ ...newTransaction, expense: parseInt(e.target.value, 10) })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
        />
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
        />
        <button onClick={editTransaction ? saveEditedTransaction : addTransaction}>
          {editTransaction ? 'Save Changes' : 'Add Transaction'}
        </button>
      </div>

      <div className="transactions-table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Vehicle Name</th>
              <th>Income (Rs)</th>
              <th>Expense (Rs)</th>
              <th>Profit/Loss (Rs)</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.vehicleName}</td>
                <td>{t.income}</td>
                <td>{t.expense}</td>
                <td>{t.profitLoss}</td>
                <td>{t.description}</td>
                <td>{t.date}</td>
                <td>
                  <button onClick={() => startEditing(t)}>Edit</button>
                  <button onClick={() => deleteTransaction(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
