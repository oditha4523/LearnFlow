
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LoginSignup.css";
import { FaUser, FaLock } from "react-icons/fa";


function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      localStorage.setItem("token", res.data.token); // Store token
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      
      <div className="auth-heading">
      <h3>LearnFlow</h3>
      <h1>AI-Generated Learning Path</h1>
      <h2>for Programming Languages</h2>
    </div>

    <div className="auth-form">
       <h2 className="form-title">Login</h2>
       <form onSubmit={handleSubmit} >

       <div className="input-container">
          <FaUser className="icon" />
        <input
          type="text"
          placeholder="Username"
          className="auth-input"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        </div>

        <div className="input-container">
          <FaLock className="icon" />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        </div>
        <button type="submit" className="auth-btn">
          Login
        </button>
        <p className="auth-footer">
          Not signed up? <Link to="/signup">Register here</Link>
        </p>
      </form>
      </div>

    </div>
  );
}

export default Login;
