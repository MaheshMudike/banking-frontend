/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Beneficiaries() {
  const [list, setList] = useState([]);

  const loadData = () => {
    api.get("/beneficiaries").then((res) => setList(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteBeneficiary = (id: number) => {
    api.delete(`/beneficiaries/${id}`).then(() => loadData());
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Your Beneficiaries</h2>

        <Link to="/beneficiaries/add">
          <button className="button-primary-light">Add Beneficiary</button>
        </Link>

        {list.length === 0 && <p>No beneficiaries found.</p>}

        {list.map((b: any) => (
          <div className="card" key={b.id} style={{ marginBottom: 15 }}>
            <p><strong>Name:</strong> {b.name}</p>
            <p><strong>Account:</strong> {b.accountNumber}</p>
            <p><strong>Nickname:</strong> {b.nickname}</p>

            <button
              style={{ background: "red", color: "white" }}
              onClick={() => deleteBeneficiary(b.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
