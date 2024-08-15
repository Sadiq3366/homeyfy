import React, {useEffect, useState} from "react";
import http from "../../../http";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
const Information = ()=>{
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    const {loginUserType, loginUserId, checkAuthStatus}=useAuth();


    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = ()=>{
        http.get('/auth/users/' + loginUserId).then(res  =>{
            setUsers({
                first_name:res.data.first_name,
                last_name:res.data.last_name,
                user_name:res.data.user_name,
                email:res.data.email,
                phone:res.data.phone,
                user_type:res.data.user_type
            });
        });
    }
    const handleChange =(e)=>{
        const {name,value} = e.target;
        setUsers({ ...users, [name]: value });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        http.post('/auth/update_user/'+loginUserId, users)
            .then(res => {
                setSuccess(res.data);
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
        <div className="container mt-5" style={{width: '50%', margin: '0 auto'}}>

            <h2 className="mb-4 container">My Profile</h2>
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-floating">
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
                        </div>

                        <div className="col-md-6 mb-3">
                            <div className="form-floating">
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
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="user_name"
                                    name="user_name"
                                    disabled
                                    placeholder="User Name"
                                    value={users.user_name}
                                    onChange={handleChange}
                                />
                                <label htmlFor="user_name">User Name</label>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-floating">
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
                        </div>

                        <div className="col-md-6 mb-3">
                            <div className="form-floating">
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="form-floating">
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
                        </div>
                    </div>
                    <div className="text-end mt-3">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Information;
