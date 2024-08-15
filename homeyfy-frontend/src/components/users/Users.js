import React, {useEffect, useState} from "react";
import http from "../../http";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
const Users = ()=>{
    const [users, setUsers] = useState([]);
    const {loginUserType, loginUserId, functionAction}= useAuth();
    const navigate =useNavigate();

    useEffect(() => {
        fetchAllUsers();
    }, []);
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
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
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
                                <th scope="row">{user.id}</th>
                                <th scope="row">{user.first_name}</th>
                                <td>{user.last_name}</td>
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
            ):(
                navigate('/')
            )}
        </>
    );
}

export default Users;
