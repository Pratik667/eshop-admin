import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";  // Import Axios
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState("");  // Error state
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  // If token exists, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard/products" />;
  }

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");
    setLoading(true);  // Start loading

    try {
      // Make the login request using Axios
      const response = await axios.post(
        "https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Check if the response contains a token
      if (response.data.token) {
        // Save the JWT token in localStorage
        localStorage.setItem("jwt", response.data.token);

        // Redirect to the dashboard
        navigate("/dashboard/products");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="login-page bg-gray-900">
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      
      {/* Form */}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="goto-link m-2 ml-0">Not an User? <Link to="/register">Register</Link></div>
      </form>
  
      {/* Display error message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  </div>
   
  );
};

export default Login;
