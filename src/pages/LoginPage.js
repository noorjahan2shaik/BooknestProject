// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', formData);
      const { token, role, email, userId } = res.data;

      // Store details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', `ROLE_${role}`);
      localStorage.setItem('email', email);         // store email
      localStorage.setItem('userId', userId);       // store user ID

      alert('Login successful!');
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (role === 'STUDENT') {
        navigate('/student/dashboard');
      } else {
        alert('Unknown role!');
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to BookNest</h2>
        <input
          type="email"
          name="email"
          placeholder="📧 Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="🔒 Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
