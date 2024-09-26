import React from "react";
import {Link} from "react-router-dom";
import logo from "../images/homeyfy-logo.webp";
import http from "../http";

const sideBar = (props)=>{

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
                await props.checkAuthStatus();
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return(
        <>
            <div className="dashboard-side-wrap">
                <div className="dashboard-logo-wrap">

                    <div className="dash-logo logo">
                        <Link to="/">
                            <img src={logo} alt="logo" width="150" height="120"/>
                        </Link>
                    </div>

                </div>
                <div className="dashboard-side-menu-wrap">
                    <ul className="side-menu list-unstyled">
                        <li><Link className="dropdown-item" to="#">Board<i
                            className="fa fa-dashboard mx-2 homeyfy_icon"></i></Link>
                        </li>
                        <li><Link className="dropdown-item" to="#">Insight<i
                            className="fa fa-layer-group mx-2 homeyfy_icon"></i></Link>
                        </li>
                        <li className={`${(props.active==='my-listings') ? 'active': ''}`}><Link className="dropdown-item" to="/my-listings/">Listings<i
                            className="fa fa-building mx-2 homeyfy_icon"></i></Link>
                        </li>
                        <li className={`${(props.active==='create-listings') ? 'active': ''}`}><Link className="dropdown-item" to="/create-listings/">Create
                            Listing <i
                                className="fa fa-plus mx-2 homeyfy_icon"></i></Link>
                        </li>
                        <li><Link className="dropdown-item" to="#">Bookings<i
                            className="fa fa-book-open mx-2 homeyfy_icon"></i></Link>
                        </li>
                        <li><Link className="dropdown-item" to="#">Reservations<i
                            className="fa fa-book mx-2 homeyfy_icon"></i></Link>
                        </li>
                        {props.loginUserType === 'admin' && (
                            <li className={`${(props.active==='users') ? 'active': ''}`}><Link className="dropdown-item" to="/users">Users<i
                                className="fa fa-user mx-2 homeyfy_icon"></i></Link>
                            </li>
                        )}
                        <li><Link className="dropdown-item" to="#">Favorites<i
                            className="fa fa-heart-o mx-2 homeyfy_icon"></i></Link>
                        </li>
                        <li><Link className="dropdown-item" to="#">Saved
                            Search<i
                                className="fa fa-search mx-2 homeyfy_icon"></i></Link>
                        </li>
                        <li><Link className="dropdown-item" to="#">Invoices<i
                            className="fa fa-dollar mx-2 homeyfy_icon"></i></Link>
                        </li>
                        <li><Link className="dropdown-item" to='#' onClick={() => {
                            logoutHandel();
                        }}>LogOut<i
                            className="fa fa-lock mx-2 homeyfy_icon"></i></Link></li>
                    </ul>
                </div>
            </div>

        </>
    );
}
export default sideBar
