import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/homeyfy-logo.webp";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaUser, FaList, FaUsers, FaSignOutAlt } from "react-icons/fa";
import http from "../http"; // ✅ axios instance

const NavBar = () => {
  const { loginUserId, loginUserType, checkAuthStatus } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef();
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logoutHandel = async () => {
    try {
      await http.post("/logout"); // ✅ axios logout
      localStorage.removeItem("authToken");
      await checkAuthStatus();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Check token on mount + every route change
  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  return (
    <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Homeyfy" />
        </Link>

        <div className="navbar-right" ref={dropdownRef}>
          {loginUserId ? (
            <div className="user-dropdown">
              <div className="user-profile-btn" onClick={toggleDropdown}>
                <FaUserCircle className="user-icon" />
                <span className="user-name">Account</span>
                <i className={`fas fa-chevron-down dropdown-arrow ${dropdownOpen ? 'rotated' : ''}`}></i>
              </div>
              
              {dropdownOpen && (
                <div className="dropdown-menu modern-dropdown">
                  <div className="dropdown-header">
                    <FaUserCircle className="dropdown-user-icon" />
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">Welcome back!</span>
                      <span className="dropdown-user-type">{loginUserType}</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <ul className="dropdown-list">
                    <li>
                      <Link to="/profile" onClick={() => setDropdownOpen(false)} className="dropdown-item">
                        <FaUser className="dropdown-icon" />
                        <span>My Profile</span>
                      </Link>
                    </li>
                    {loginUserType === "admin" && (
                      <>
                        <li>
                          <Link to="/my-listings" onClick={() => setDropdownOpen(false)} className="dropdown-item">
                            <FaList className="dropdown-icon" />
                            <span>My Listings</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/users" onClick={() => setDropdownOpen(false)} className="dropdown-item">
                            <FaUsers className="dropdown-icon" />
                            <span>Manage Users</span>
                          </Link>
                        </li>
                      </>
                    )}
                    <li className="dropdown-divider"></li>
                    <li>
                      <button onClick={logoutHandel} className="dropdown-item logout-btn">
                        <FaSignOutAlt className="dropdown-icon" />
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn"><span>Sign In</span></Link>
              <Link to="/register" className="register-btn"><span>Get Started</span></Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
