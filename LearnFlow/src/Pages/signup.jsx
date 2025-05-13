import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LoginSignup.css";

function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    if (password.length < 8) return "Too short (min 8)";
    if (!/[A-Z]/.test(password)) return "Missing uppercase letter";
    if (!/[a-z]/.test(password)) return "Missing lowercase letter";
    if (!/[0-9]/.test(password)) return "Missing number";
    if (!/[!@#$%^&*]/.test(password)) return "Missing special character";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pwError = checkPasswordStrength(form.password);
    if (pwError) {
      setError(pwError);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="form-title">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="auth-input"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          required
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            setError(checkPasswordStrength(e.target.value));
          }}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-btn">
          Sign Up
        </button>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </div>
  );
}

export default SignUp;
