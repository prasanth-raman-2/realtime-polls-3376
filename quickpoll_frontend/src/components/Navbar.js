import React from "react";

// PUBLIC_INTERFACE
function Navbar({ user, onLogout }) {
  /** Navigation bar (fixed top), shows app title, login/register or user menu. */
  return (
    <nav className="navbar">
      <div className="navbar-title">Quickpoll</div>
      <div className="navbar-menu">
        {!user ? (
          <>
            <a href="/login" className="navbar-link">Login</a>
            <a href="/register" className="navbar-link">Register</a>
          </>
        ) : (
          <>
            <span className="navbar-user">Hi, {user.username}</span>
            <button className="navbar-logout" onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
