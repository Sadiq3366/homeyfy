import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import http from "../../http"; // Axios instance

const Login = () => {
  const [users, setUser] = useState({});
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { loginUserType, loginUserId, logoutUser, checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...users, [name]: value });
  };

  // Handle login submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const login = await http.post("/auth/login", users);
      setSuccess(login.data.message);
      localStorage.setItem("authToken", login.data.access_token);
      localStorage.setItem("loginTime", Date.now());

      await checkAuthStatus(); // update auth context

      navigate("/users"); // redirect on success
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Auto-logout check
  useEffect(() => {
    const checkExpiry = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime && Date.now() - loginTime > 24 * 60 * 60 * 1000) {
        logoutUser();
        navigate("/login");
      }
    };

    const interval = setInterval(checkExpiry, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [logoutUser, navigate]);

  // If already logged in, go to users
  useEffect(() => {
    if (loginUserType && loginUserId) {
      navigate("/users");
    }
  }, [loginUserType, loginUserId, navigate]);

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card card p-4 shadow-lg">
        <h3 className="text-center mb-2 fw-bold">Welcome Back 👋</h3>
        <p className="text-center text-muted mb-4">Please login to continue</p>

        {loading && (
          <div className="alert alert-info">⏳ Please wait, request sent...</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <i className="fas fa-user input-icon"></i>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Username or Email"
              name="username"
              value={users.username || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <i className="fas fa-lock input-icon"></i>
            <input
              type="password"
              className="form-control ps-5"
              placeholder="Password"
              name="password"
              value={users.password || ""}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3 text-muted">Or login with</div>
        <div className="d-flex justify-content-center gap-2 mt-2">
          <button type="button" className="btn btn-light border social-btn">
            <i className="fab fa-google me-2"></i> Google
          </button>
          <button type="button" className="btn btn-light border social-btn">
            <i className="fab fa-facebook-f me-2"></i> Facebook
          </button>
        </div>

        <p className="text-center mt-4">
          New user?{" "}
          <Link to="/register" className="fw-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
