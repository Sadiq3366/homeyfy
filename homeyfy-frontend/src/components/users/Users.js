import React, {useEffect, useState} from "react";
import http from "../../http";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import SideBar from "../../admin-panel/SideBar";
const Users = (props)=>{
    const [users, setUsers] = useState([]);
    const {loginUserType, loginUserId, checkAuthStatus}= useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(loginUserType === 'admin'){
            fetchAllUsers();
        } else {
            navigate('/');
        }
    }, [loginUserType]);
    const fetchAllUsers = ()=> {
        http.get('/auth/users').then(res=>{
            setUsers(res.data);
        })
    }
    const deleteUser = (id)=>{
        http.delete('/auth/users_delete/'+id).then(res=>{
            fetchAllUsers();
        });
    }
    return(
        <>

            {loginUserType && loginUserId ? (
                <>
                    <SideBar active={props.active} loginUserType={loginUserType} loginUserId={loginUserId} checkAuthStatus={checkAuthStatus} />
                    <div className="user_content_title">
                        <div className="container">
                            Users
                        </div>

                    </div>
                    <div className="user_dashboard_wrap">
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="container">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">User Type</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{user.user_name}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td>{user.user_type}</td>
                                            <td>
                                                <Link className="btn btn-info" to='/profile/'>Edit</Link>
                                                <button type="button" className="btn btn-danger" onClick={() => {
                                                    deleteUser(user.id)
                                                }}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            ):(
                navigate('/')
            )}
        </>
    );
}

export default Users;
