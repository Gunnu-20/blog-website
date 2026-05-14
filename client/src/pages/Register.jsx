import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <h2>Create Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="error-msg">{error}</div>}
        <div>
          <label>Username</label>
          <input type="text" name="username" value={form.username}
            onChange={handleChange} required placeholder="johndoe" />
        </div>
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
        <button className="auth-submit" type="submit">Register</button>
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}