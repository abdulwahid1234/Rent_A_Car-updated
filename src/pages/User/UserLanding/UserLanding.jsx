import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './UserLanding.css';
import image from "../../User/image.png"

const TaxiLanding = () => {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="header1">
        <div className="logo-container1">
          <div className="logo1">
            <span className="logo-text1">LOGO</span>
          </div>
        </div>

        <nav className="navigation">
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Team</a>
          <a href="#" className="nav-link">Pricing</a>
          <a href="#" className="nav-link">Issues</a>
          <Link to="/userlogin" className="nav-link">Sign In</Link> {/* Link to Login */}
        </nav>

        <Link to="/user">
          {/* <button className="get-more-btn">
            Get More
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button> */}
        </Link>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Content */}
        <div className="content-left">
          <h1 className="main-heading">
            <span className="heading-line">Bismillah</span>
            <br />
            <span className="heading-line">Rent A Car Service</span>
          </h1>

          <div className="text-content">
            <p className="subtitle">Lorem ipsum dolor sit amet,<br /> consectetur adipiscing</p>
            <p className="description">Sign up and get a discount</p>
          </div>

          <Link to="/usersignup">
            <button className="signup-btn">
              SIGN UP
              <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Right Illustration */}
        <div className="content-right">
          <div className="illustration-container">
            <img src={image} alt="Isometric taxi service illustration" className="illustration-image" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaxiLanding;
