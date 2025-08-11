import React, { useEffect, useState } from "react";
import MainSearch from "../search/MainSearch";
import { 
  FaFire, 
  FaPlus, 
  FaHandshake, 
  FaStar, 
  FaShieldAlt,
  FaHeadset,
  FaCreditCard,
  FaArrowRight,
  FaPlay
} from "react-icons/fa";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="modern-home">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Animated Background Elements */}
        <div className="floating-elements">
          <div className="floating-element floating-1"></div>
          <div className="floating-element floating-2"></div>
          <div className="floating-element floating-3"></div>
          <div className="floating-element floating-4"></div>
        </div>

        {/* Hero Content */}
        <div className={`hero-content ${isVisible ? 'fade-in' : ''}`}>
          <div className="hero-badge">
            ✨ Trusted by 50,000+ travelers worldwide
          </div>
          
          <h1 className="hero-title">
            Find Your Perfect
            <br />
            <span className="highlight-text">Dream Stay</span>
          </h1>
          
          <p className="hero-subtitle">
            Discover extraordinary places to stay, from cozy apartments to luxury villas.
            <br />
            Your perfect getaway is just a search away.
          </p>

          {/* Search Component */}
          <div className="search-container">
            <MainSearch />
          </div>

          {/* Quick Action Cards */}
          <div className="quick-actions">
            <div className="action-card trending">
              <div className="card-icon">
                <FaFire />
              </div>
              <div className="card-content">
                <h3>Trending Destinations</h3>
                <p>Discover hot spots everyone's talking about</p>
              </div>
              <FaArrowRight className="card-arrow" />
            </div>

            <div className="action-card new-listings">
              <div className="card-icon">
                <FaPlus />
              </div>
              <div className="card-content">
                <h3>New Listings</h3>
                <p>Fresh properties added this week</p>
              </div>
              <FaArrowRight className="card-arrow" />
            </div>

            <div className="action-card host">
              <div className="card-icon">
                <FaHandshake />
              </div>
              <div className="card-content">
                <h3>Become a Host</h3>
                <p>Start earning with your property</p>
              </div>
              <FaArrowRight className="card-arrow" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Homeyfy?</h2>
            <p className="section-subtitle">
              Experience the best in hospitality with our carefully curated properties
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon verified">
                <FaShieldAlt />
              </div>
              <h3>Verified Properties</h3>
              <p>Every property is thoroughly verified and inspected for quality and safety</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon support">
                <FaHeadset />
              </div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support to assist you whenever you need help</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon secure">
                <FaCreditCard />
              </div>
              <h3>Secure Payments</h3>
              <p>Bank-level security with multiple payment options for your convenience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Guests</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Properties</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of travelers who trust Homeyfy for their perfect stays</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                <FaPlay />
                Watch Demo
              </button>
              <button className="cta-btn secondary">
                Get Started Free
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;