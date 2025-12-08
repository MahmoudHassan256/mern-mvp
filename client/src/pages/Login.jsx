import React, { useEffect, useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login({ email, password });
      console.log("Login response", response);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Server error. Please try again."
      );
    }
  };
  return (
    <div>
      <h1>Welcome Back</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
