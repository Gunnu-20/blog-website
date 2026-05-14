import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">📝 BlogHub</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span style={{ fontSize: "0.9rem", color: "#374151" }}>
              Hi, <strong>{user.username}</strong>
            </span>
            <Link to="/create" className="btn-nav-primary">+ New Post</Link>
            <button className="btn-nav-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-nav-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}