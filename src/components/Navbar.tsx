import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      background: "#f0f0f0"
    }}>
      <div>
        <Link to="/" style={{ marginRight: 20 }}>Dashboard</Link>
        <Link to="/transfer">Transfer</Link>
      </div>

      <button onClick={logout} >Logout</button>
    </div>
  );
}
