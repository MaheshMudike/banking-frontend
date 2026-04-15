/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Transactions() {
  const { id } = useParams(); // accountId from URL
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get(`/transactions/${id}`).then((res) => {
      setTransactions(res.data);
    });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Transaction History</h2>

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
            <p><strong>Date:</strong> {tx.date}</p>
          </div>
        ))}
      </div>
    </>
  );
}
