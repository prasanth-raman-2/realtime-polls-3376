import React, { useState } from "react";
import AuthService from "../services/AuthService";

// PUBLIC_INTERFACE
function RegisterPage({ setUser }) {
  /** Registration form for new users. */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr(null);
    try {
      const user = await AuthService.register(username, email, password);
      setUser(user);
    } catch (error) {
      setErr(error.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <button type="submit" className="btn btn-large">Register</button>
        </form>
        <div className="auth-footer">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
