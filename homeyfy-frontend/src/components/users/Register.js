import React, {useState} from "react";
import http from "../../http";
import {useNavigate} from "react-router-dom";
const Register = ()=>{
    const [users,setUsers] = useState({
        first_name: '',
        last_name: '',
        user_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation:'',
        user_type: ''
    });
   const navigate = useNavigate();
   const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const handleChange =(e)=>{
        setError(null);
        setSuccess(null);
       const {name,value} = e.target;
        setUsers({ ...users, [name]: value });
    }
    const siteURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
    const handleSubmit=(e)=>{
        e.preventDefault();
        http.post('/auth/register?url='+siteURL, users)
            .then(res => {
                setSuccess(res.data.Message);
                setError(null);
                // navigate('/users');
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                } else if (err.request) {
                    setError(err.request.message);
                } else {
                    setError(err.message);
                }
                setSuccess(null);
            });
    }
    return (
        <div className="container mt-5 mb-5 col-md-8 form-design">
            <div className="row">
                <div className="col-md-6 register_logo">
                    <div className="login-register-title">
                        Create an account
                    </div>
                </div>
                <div className='col-md-6 pt-3 pb-3 '>
                    <h3 className="mb-4">Register</h3>

                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success" role="alert">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                placeholder="First Name"
                                value={users.first_name}
                                onChange={handleChange}
                            />
                            <label htmlFor="first_name">First Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                placeholder="Last Name"
                                value={users.last_name}
                                onChange={handleChange}
                            />
                            <label htmlFor="last_name">Last Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="user_name"
                                name="user_name"
                                placeholder="User Name"
                                value={users.user_name}
                                onChange={handleChange}
                            />
                            <label htmlFor="user_name">User Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={users.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                value={users.phone}
                                onChange={handleChange}
                            />
                            <label htmlFor="phone">Phone Number</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={users.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password_confirmation"
                                name="password_confirmation"
                                placeholder="Password Confirmation"
                                value={users.password_confirmation}
                                onChange={handleChange}
                            />
                            <label htmlFor="password confirmed">Conformed Password</label>
                        </div>

                        <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                id="user_type"
                                name="user_type"
                                value={users.user_type}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select User Type</option>
                                <option value="admin">Admin</option>
                                <option value="host">Host</option>
                                <option value="renter">Renter</option>
                            </select>
                            <label htmlFor="user_type">User Type</label>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary btn-full-width">Register</button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
}

export default Register;
