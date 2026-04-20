/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";



export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const { logout } = useContext(AuthContext);


  useEffect(() => {
    api.get("/accounts").then((res) => setAccounts(res.data));
  }, []);

  return (
    <><Navbar /><div className="page-container">
          <h2>Your Accounts</h2>

          {accounts.map((acc: any) => (
              <div className="card" key={acc.id} style={{ marginBottom: 20 }}>
                  <p><strong>Account:</strong> {acc.accountNumber}</p>
                  <p><strong>Balance:</strong> {acc.balance}</p>

                <Link to={`/transactions/${acc.id}`}>
                    View Transactions
                </Link>
              </div>
          ))}
         <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <Link to="/beneficiaries">
              <button
                className="button-primary-light">
                Manage Beneficiaries
              </button>
            </Link>

            <button
              onClick={logout}
              className="button-primary-light">
              Logout
            </button>
          </div>
      </div>
    </>
  );
}
