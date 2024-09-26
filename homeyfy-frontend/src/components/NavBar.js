import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../images/homeyfy-logo.webp";
import http from "../http";
import {useAuth} from "../context/AuthContext";

const NavBar = (props) =>{
    const {loginUserType, loginUserId, checkAuthStatus} = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const logoutHandel = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await http.post('/logout/', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                localStorage.removeItem('authToken');
                await checkAuthStatus();
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


    return(
       <>
           <nav className="navbar navbar-expand-lg bg-body-tertiary">
               <div className="container-fluid">
                   <Link className="navbar-brand" to="/"><img src={logo} alt="logo" width="100" height='50' /></Link>
                   <div className="collapse navbar-collapse" id="navbarSupportedContent">
                       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                           <li className="nav-item">
                               <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                           </li>
                           {loginUserId && loginUserType === "admin" &&(
                               <li className="nav-item">
                                   <Link className="nav-link" aria-current="page" to="/users">Users</Link>
                               </li>
                           )}
                           {loginUserId && loginUserType && (
                               <li className="nav-item">
                                   <Link className="nav-link" aria-current="page" to="/profile">Profile</Link>
                               </li>
                           )}

                       </ul>
                       {loginUserType && loginUserId ? (
                           <div className="dropdown">
                               <button
                                   onClick={toggleDropdown}
                                   className="navbar-logged-in-wrap dropdown-toggle"
                                   aria-expanded={isOpen}
                               >
                                   <img
                                       width="42"
                                       height="42"
                                       alt="author"
                                       src="http://localhost/houzez/wp-content/themes/houzez/img/profile-avatar.png"
                                       className="rounded"
                                   />
                               </button>
                               {isOpen && (
                                   <ul className="logged-in-nav dropdown-menu show">
                                       <li><Link className="dropdown-item" to="#" onClick={handleClose}>Board<i
                                           className="fa fa-dashboard mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       <li><Link className="dropdown-item" to="#" onClick={handleClose}>Insight<i
                                           className="fa fa-layer-group mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       <li><Link className="dropdown-item" to="/my-listings/" onClick={handleClose}>Listings<i
                                           className="fa fa-building mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       <li><Link className="dropdown-item" to="#" onClick={handleClose}>Create
                                           Listing <i
                                               className="fa fa-plus mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       <li><Link className="dropdown-item" to="#" onClick={handleClose}>Bookings<i
                                           className="fa fa-book-open mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       <li><Link className="dropdown-item" to="#" onClick={handleClose}>Reservations<i
                                           className="fa fa-book mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       {loginUserType==='admin' &&(
                                       <li><Link className="dropdown-item" to="/users" onClick={handleClose}>Users<i
                                           className="fa fa-user mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       )}
                                       <li><Link className="dropdown-item" to="#" onClick={handleClose}>Favorites<i
                                           className="fa fa-heart-o mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       <li><Link className="dropdown-item" to="#" onClick={handleClose}>Saved
                                           Search<i
                                               className="fa fa-search mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       <li><Link className="dropdown-item" to="#" onClick={handleClose}>Invoices<i
                                           className="fa fa-dollar mx-2 homeyfy_icon"></i></Link>
                                       </li>
                                       <li><Link className="dropdown-item" to='#' onClick={() => {
                                           handleClose();
                                           logoutHandel();
                                       }}>LogOut<i
                                           className="fa fa-lock mx-2 homeyfy_icon"></i></Link></li>
                                   </ul>
                               )}
                           </div>
                       ) : (
                           <div className="d-flex">
                               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                               <li className="nav-item">
                                       <Link className="nav-link" aria-current="page" to="/login">Login</Link>
                                   </li>
                                   <li className="nav-item">
                                       <Link className="nav-link" aria-current="page" to="/register">Register</Link>
                                   </li>
                               </ul>
                           </div>
                       )}
                   </div>
               </div>
           </nav>
       </>
   );
}

export default NavBar;
