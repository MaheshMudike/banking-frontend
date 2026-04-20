/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Transfer() {
  const [debitAccounts, setDebitAccounts] = useState([]);
  const [creditAccounts, setCreditAccounts] = useState([]);

  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const resetTransfer = () => {
    setFromId("");
    setToId("");
    setAmount("");
  };


  useEffect(() => {
  (async () => {
    const debit = await api.get("/accounts/debit");
    const credit = await api.get("/accounts/credit");

    setDebitAccounts(debit.data);
    setCreditAccounts(credit.data);

    resetTransfer();
  })();
}, []);



  const handleTransfer = async () => {
    try {
      let toAccountId = null;
      let toAccountNumber = null;

      if (toId.startsWith("A-")) {
        toAccountId = Number(toId.replace("A-", ""));
      } else if (toId.startsWith("B-")) {
        toAccountNumber = toId.replace("B-", "");
      }

      const res = await api.post("/transfer", {
        fromAccountId: Number(fromId),
        toAccountId,
        toAccountNumber,
        amount: Number(amount)
      });
       resetTransfer();
      setMessage(`Success! Reference: ${res.data.reference}`);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Transfer failed");
    }
  };


  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="card">
          <h2>Transfer Funds</h2>

          {/* Debit Account */}
          <label>From Account</label>
          <select
            className="input-select"
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
          >
            <option value="" disabled>
              Please select debit account
            </option>

            {debitAccounts.map((acc: any) => (
              <option key={acc.id} value={acc.id}>
                {acc.accountNumber} — AED {acc.balance}
              </option>
            ))}
          </select>

          <br /><br />

          {/* Credit Account */}
          <label>To Account</label>
          <select
            className="input-select"
            value={toId}
            onChange={(e) => setToId(e.target.value)}
          >
            <option value="" disabled>
              Please select credit account
            </option>

          {creditAccounts.map((acc: any) => (
            <option
              key={acc.id}
              value={
                acc.type === "ACCOUNT"
                  ? `A-${acc.id}`
                  : `B-${acc.accountNumber}`
              }
            >
              {acc.name || acc.accountNumber}
            </option>
          ))}
          </select>

          <br /><br />

          <input
            className="input-select"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <br /><br />

          <button className="login-button" onClick={handleTransfer}>
            Transfer
          </button>

          {message && (
            <p
              className={
                message.startsWith("Success")
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
