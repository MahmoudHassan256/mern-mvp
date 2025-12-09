import React, { useEffect, useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await register({ name, email, password });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.response?.data?.message || "Server error.");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">Create Account</h1>

      <form className="auth-form" onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-btn" type="submit">
          Register
        </button>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
