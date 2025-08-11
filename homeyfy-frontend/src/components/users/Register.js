import React, { useState } from "react";
import http from "../../http";
import { useNavigate , Link} from "react-router-dom";

const Register = () => {
  const [users, setUsers] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    user_type: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setError(null);
    setSuccess(null);
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const siteURL = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    http
      .post("/auth/register?url=" + siteURL, users)
      .then((res) => {
        setSuccess(res.data.Message);
        setError(null);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else if (err.request) {
          setError(err.request.message);
        } else {
          setError(err.message);
        }
        setSuccess(null);
      });
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-card card p-4 shadow-lg">
        <h3 className="text-center mb-2 fw-bold">Create an Account 📝</h3>
        <p className="text-center text-muted mb-4">
          Fill in your details to register
        </p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6 position-relative">
              <i className="fas fa-user input-icon"></i>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="First Name"
                name="first_name"
                value={users.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 position-relative">
              <i className="fas fa-user input-icon"></i>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Last Name"
                name="last_name"
                value={users.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 position-relative">
              <i className="fas fa-user-circle input-icon"></i>
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Username"
                name="user_name"
                value={users.user_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 position-relative">
              <i className="fas fa-envelope input-icon"></i>
              <input
                type="email"
                className="form-control ps-5"
                placeholder="Email"
                name="email"
                value={users.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 position-relative">
              <i className="fas fa-phone input-icon"></i>
              <input
                type="tel"
                className="form-control ps-5"
                placeholder="Phone Number"
                name="phone"
                value={users.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 position-relative">
              <i className="fas fa-lock input-icon"></i>
              <input
                type="password"
                className="form-control ps-5"
                placeholder="Password"
                name="password"
                value={users.password}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 position-relative">
              <i className="fas fa-lock input-icon"></i>
              <input
                type="password"
                className="form-control ps-5"
                placeholder="Confirm Password"
                name="password_confirmation"
                value={users.password_confirmation}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <select
                className="form-select"
                name="user_type"
                value={users.user_type}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select User Type
                </option>
                <option value="admin">Admin</option>
                <option value="host">Host</option>
                <option value="renter">Renter</option>
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </div>
          </div>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="fw-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
