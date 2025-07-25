import React, { useState } from "react";
import AuthService from "../services/AuthService";

// PUBLIC_INTERFACE
function LoginPage({ setUser }) {
  /** Login form for user authentication. */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr(null);
    try {
      const user = await AuthService.login(username, password);
      setUser(user);
    } catch (error) {
      setErr(error.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {err && <div className="auth-error">{err}</div>}
          <button type="submit" className="btn btn-large">Login</button>
        </form>
        <div className="auth-footer">
          <a href="/register">Don't have an account? Register</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
