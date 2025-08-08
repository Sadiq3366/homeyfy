import React from "react";
import MainSearch from "../search/MainSearch";

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your <br /> <span className="highlight">Next Stay</span>
          </h1>

          <MainSearch />
 
          <div className="home-cards">
            <div className="home-card">🏖️ Trending Destinations</div>
            <div className="home-card">🆕 New Listings</div>
            <div className="home-card">🤝 Host with Us</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
