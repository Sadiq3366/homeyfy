import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const Login = (props)=>{
    const [users,setUser] = useState([]);
    const {loginUserType, loginUserId, checkAuthStatus} = useAuth();
    const handleChange = (e)=>{
        const {name,value}= e.target;
        setUser({...users,[name]:value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        props.loginAction(users);
    };
    const navigate = useNavigate();

    return(
        <div>
            {loginUserType && loginUserId ? (
                navigate('/users')
            ): (
                <div className="container mt-5 mb-5 col-md-6 form-design">
                    <div className="row">
                        <div className="col-md-6 register_logo">
                            <div className="login-register-title">
                                Welcome to you on the login form
                            </div>
                        </div>
                        <div className='col-md-6 pt-3 pb-3 '>
                            <h3 className="mb-4">Login</h3>

                            {props.loginError && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {props.loginError}
                                </div>
                            )}
                            {props.loginSuccess && (
                                <div className="alert alert-success" role="alert">
                                    {props.loginSuccess}
                                    {navigate('/users')}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="User Name or Email"
                                        value={users.user_name}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="user_name">User-Name/Email</label>
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

                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary btn-full-width">Login</button>
                                </div>

                                <div className="text-center">
                                    --------- Or Login Using ---------
                                </div>

                            </form>
                            <div className="mt-2 space-y-2 text-center">

                                <button className="btn social_btn">
                                    Google
                                </button>

                                <button className="btn social_btn">
                                    Facebook
                                </button>
                            </div>
                            <div className="mt-2 space-y-2 text-center">
                                <div className="text-center">
                                    New user? <Link to="/register">Create and Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}

export default Login;
