import React, { useEffect, useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await register({ name, email, password });
      console.log("Register response", response);
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
      <h1>Create Account</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type="submit">Register</button>
                {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
