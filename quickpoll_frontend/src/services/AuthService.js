const API = "/api";

const AuthService = {
  // PUBLIC_INTERFACE
  async login(username, password) {
    /** Sends login request, returns user data on success. */
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return await res.json();
  },

  // PUBLIC_INTERFACE
  async register(username, email, password) {
    /** Sends registration request, returns user data on success. */
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password })
    });
    if (!res.ok) throw new Error("Registration failed.");
    return await res.json();
  },

  // PUBLIC_INTERFACE
  async logout() {
    /** Logs out the current user. */
    await fetch(`${API}/logout`, { method: "POST", credentials: "include" });
  },

  // PUBLIC_INTERFACE
  async getCurrentUser() {
    /** Gets current user session (if any) */
    const res = await fetch(`${API}/me`, { credentials: "include" });
    if (!res.ok) return null;
    return await res.json();
  }
};

export default AuthService;
