import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../images/homeyfy-logo.webp";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const { loginUserId, loginUserType, checkAuthStatus } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logoutHandel = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("/logout/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        localStorage.removeItem("authToken");
        await checkAuthStatus();
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar-container">
      <div className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Homeyfy" />
        </Link>

        <div className="navbar-right" ref={dropdownRef}>
          {loginUserId ? (
            <div className="dropdown">
              <FaUserCircle className="user-icon" onClick={toggleDropdown} />
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link></li>
                  <li><Link to="/my-listings" onClick={() => setDropdownOpen(false)}>Listings</Link></li>
                  {loginUserType === "admin" && (
                    <li><Link to="/users" onClick={() => setDropdownOpen(false)}>Users</Link></li>
                  )}
                  <li><button onClick={logoutHandel}>Log out</button></li>
                </ul>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
