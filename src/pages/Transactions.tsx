/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Transactions() {
  const { id } = useParams(); // accountId from URL
  const [transactions, setTransactions] = useState([]);

  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    api.get(`/transactions/${id}`).then((res) => {
      setTransactions(res.data);
    });
  }, [id]);

  // Filter function
  const applyFilter = () => {
    const params: any = {};

    if (type) params.type = type;
    if (from) params.from = from;
    if (to) params.to = to;

    api
      .get(`/transactions/${id}/filter`, { params })
      .then((res) => setTransactions(res.data));
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Transaction History</h2>

        {/* Filter UI */}
        <div className="card" style={{ marginBottom: 20, padding: 15 }}>
          <h3>Filter Transactions</h3>

          <div style={{ marginBottom: 10 }}>
            <label>Type: </label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All</option>
              <option value="DEBIT">Debit</option>
              <option value="CREDIT">Credit</option>
            </select>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>From Date: </label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>To Date: </label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <button onClick={applyFilter}>Apply Filter</button>
        </div>

        {/* Transaction List */}
        {transactions.length === 0 && <p>No transactions found.</p>}

        {transactions.map((tx: any) => (
          <div
            className="card"
            key={tx.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <p><strong>Type:</strong> {tx.type}</p>
            <p><strong>Amount:</strong> AED {tx.amount}</p>
            <p><strong>Description:</strong> {tx.description}</p>
            <p><strong>Reference:</strong> {tx.referenceNumber}</p>
            <p><strong>Date:</strong> {new Date(tx.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </>
  );
}
