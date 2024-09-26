import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/v4-shims.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Users from "./components/users/Users";
import Information from "./components/users/profile/Information";
import LandingPage from "./components/home/Home";
import main from "./css/Main.css";
import http from "./http";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import VerifyEmail from "./components/VerifyEmail";
import SearchResult from "./components/search/SearchResult";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingBar from 'react-top-loading-bar';
import Listings from "./admin-panel/listing-dashboard/Listings";
import Submit from "./admin-panel/submit-listing/Submit";

function Layout({ handleSubmit, success, error, setProgress }) {
    const location = useLocation();
    const hideMenuOnPaths = ['/users','/my-listings/','/create-listings/']; // List of paths where the menu should be hidden

    return (
        <div>
            {!hideMenuOnPaths.includes(location.pathname) && <NavBar />}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login loginAction={handleSubmit} loginSuccess={success} loginError={error} />} />
                <Route path='/users' element={<Users active='users' />} />
                <Route path='/profile' element={<Information />} />
                <Route path='/verify-email/' element={<VerifyEmail />} />
                <Route path='/search/' element={<SearchResult setProgress={setProgress} />} />
                <Route path='/my-listings/' element={<Listings active='my-listings' />} />
                <Route path='/create-listings/' element={<Submit active='create-listings' />} />
            </Routes>
        </div>
    );
}

function App() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { checkAuthStatus } = useAuth();
    const [progress, setProgressbar] = useState(0);

    const handleSubmit = async (users) => {
        try {
            const login = await http.post('/auth/login', users);
            setSuccess(login.data.message);
            localStorage.setItem('authToken', login.data.authToken);
            await checkAuthStatus();
        } catch (err) {
            setError(err.message);
        }
    };

    const setProgress = (progress) => {
        setProgressbar(progress);
    };

    return (
        <Router>
            <LoadingBar
                color="red"
                progress={progress}
                height={3}
            />
            <Layout handleSubmit={handleSubmit} success={success} error={error} setProgress={setProgress} />
        </Router>
    );
}

export default App;
