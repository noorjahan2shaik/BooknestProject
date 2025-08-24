// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="homepage">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to <span className="highlight">BookNest</span></h1>
          <p className="hero-subtitle">
            Explore a world of knowledge with our AI-powered digital library. Discover, read, and grow smarter every day.
          </p>
          <a href="/login" className="cta-button">Get Started</a>
        </div>
      </div>
    </>
  );
};

export default HomePage;

