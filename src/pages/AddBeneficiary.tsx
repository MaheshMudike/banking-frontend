/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AddBeneficiary() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [nickname, setNickname] = useState("");

  const submit = (e: any) => {
    e.preventDefault();

    api
      .post("/beneficiaries", {
        name,
        accountNumber,
        nickname,
      })
      .then(() => navigate("/beneficiaries"));
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Add Beneficiary</h2>

        <form onSubmit={submit} className="card" style={{ padding: 20, maxWidth: 400 }}>
            
            <div className="form-group">
                <label>Name</label>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>

            <div className="form-group">
                <label>Account Number</label>
                <input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                />
            </div>

            <div className="form-group">
                <label>Nickname</label>
                <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                />
            </div>

            <button type="submit" className="button-primary-light">
                Save
            </button>
        </form>

      </div>
    </>
  );
}
