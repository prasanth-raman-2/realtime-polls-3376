import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AuthService from './services/AuthService';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [route, setRoute] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Effect: session fetch on app load
  useEffect(() => {
    AuthService.getCurrentUser().then(u => {
      setUser(u);
      setLoadingUser(false);
    });
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Simple client-side routing
  useEffect(() => {
    const handlePop = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const navigate = path => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
    navigate("/login");
  };

  let content;
  if (loadingUser) {
    content = <div className="page-loading">Loading...</div>;
  } else if (!user && route.startsWith('/register')) {
    content = <RegisterPage setUser={setUser} />;
  } else if (!user && route.startsWith('/login')) {
    content = <LoginPage setUser={setUser} />;
  } else if (!user) {
    // Redirect unknown to login
    content = <LoginPage setUser={setUser} />;
  } else if (route === "/" || route === "/dashboard") {
    content = <DashboardPage user={user} />;
  } else {
    content = <div>Not found</div>;
  }

  // Link interception for SPA navigation
  useEffect(() => {
    const handler = e => {
      const anchor = e.target.closest("a");
      if (anchor && anchor.getAttribute("href")?.startsWith("/")) {
        e.preventDefault();
        navigate(anchor.getAttribute("href"));
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-content">{content}</main>
    </div>
  );
}

export default App;
