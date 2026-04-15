/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Transfer() {
  const [accounts, setAccounts] = useState([]);
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
    api.get("/accounts").then((res) => {
      setAccounts(res.data);
      resetTransfer();
    });
  }, []);



  const handleTransfer = async () => {
    try {
      const res = await api.post("/transfer", {
        fromAccountId: fromId,
        toAccountId: toId,
        amount: Number(amount)
      });
      const fromAcc = accounts.find(a => a.id === Number(fromId));
      const toAcc = accounts.find(a => a.id === Number(toId));
      setMessage(
      `Success! You transferred AED ${amount} from ${fromAcc?.accountNumber} to ${toAcc?.accountNumber}. Reference: ${res.data.reference}`
      );
       resetTransfer();
      const updated = await api.get("/accounts");
      setAccounts(updated.data);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container" >
        <div className="card">
        <h2>Transfer Funds</h2>

        <label>From Account</label>
        <select className="input-select" value={fromId} onChange={(e) => setFromId(e.target.value)}>
        <option value="" disabled>Please select debit account</option>
          {accounts.map((acc: any) => (
            <option key={acc.id} value={acc.id}>
              {acc.accountNumber} — AED {acc.balance}
            </option>
          ))}
        </select>

        <br /><br />

        <label>To Account</label>
        <select className="input-select" value={toId} onChange={(e) => setToId(e.target.value)}>
         <option value="" disabled> Please select credit account </option>
          {accounts.map((acc: any) => (
            <option key={acc.id} value={acc.id}>
              {acc.accountNumber} — AED {acc.balance}
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

        <button className="login-button" onClick={handleTransfer}>Transfer</button>

        {message && (
            <p className={message.startsWith("Success") ? "success-message" : "error-message"}>
                {message}
            </p>
            )}
        </div>
      </div>
    </>
  );
}
