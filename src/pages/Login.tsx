import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles.css"; // make sure this is imported

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token);
      window.location.href = "/";
    } catch {
      setError("Invalid username or password");
    }
  };

   return (
    <div className="page-container">
        <div className="card">
        <h2>Login</h2>

        <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />

        <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
            Login
        </button>

        {error && <p className="login-error">{error}</p>}
        </div>
    </div>
 );


}
