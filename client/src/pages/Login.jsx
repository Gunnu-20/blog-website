import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="error-msg">{error}</div>}
        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email}
            onChange={handleChange} required placeholder="you@example.com" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password}
            onChange={handleChange} required placeholder="••••••••" />
        </div>
        <button className="auth-submit" type="submit">Login</button>
      </form>
      <p className="auth-footer">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}