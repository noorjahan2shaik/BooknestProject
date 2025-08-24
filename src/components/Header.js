// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      padding: '10px',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ marginLeft: '10px' }}>📚 BookNest</h2>
      <div style={{ marginRight: '10px' }}>
        <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </header>
  );
};

export default Header;

