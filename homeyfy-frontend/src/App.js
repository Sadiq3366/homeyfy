// App.js
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/v4-shims.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Users from "./components/users/Users";
import Information from "./components/users/profile/Information";
import LandingPage from "./components/home/Home";
import "./css/Main.css";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import VerifyEmail from "./components/VerifyEmail";
import SearchResult from "./components/search/SearchResult";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingBar from 'react-top-loading-bar';
import Listings from "./admin-panel/listing-dashboard/Listings";
import Submit from "./admin-panel/submit-listing/Submit";
import ListingDetailPage from './components/listing-view/Detail';

// ✅ PrivateRoute component
function PrivateRoute() {
    const { loginUserId } = useAuth();
    return loginUserId ? <Outlet /> : <Navigate to="/login" replace />;
}

function Layout({ setProgress }) {
    const location = useLocation();
    const hideMenuOnPaths = ['/users', '/my-listings', '/create-listings'];

    const normalizedPath = location.pathname.replace(/\/$/, '');
    const shouldHide = hideMenuOnPaths.includes(normalizedPath);

    return (
        <div>
            {!shouldHide && <NavBar />}
            <Routes>
                {/* Public routes */}
                <Route path='/' element={<LandingPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/verify-email' element={<VerifyEmail />} />
                <Route path='/search' element={<SearchResult setProgress={setProgress} />} />
                <Route path='/listing/:id' element={<ListingDetailPage />} />

                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                    <Route path='/users' element={<Users active='users' />} />
                    <Route path='/profile' element={<Information />} />
                    <Route path='/my-listings' element={<Listings active='my-listings' />} />
                    <Route path='/create-listings' element={<Submit active='create-listings' />} />
                </Route>
            </Routes>
        </div>
    );
}

function App() {
    const { checkAuthStatus } = useAuth();
    const [progress, setProgressbar] = useState(0);

    useEffect(() => {
        checkAuthStatus(); // ✅ Load auth state on app start
    }, []);

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
            <Layout setProgress={setProgress} />
        </Router>
    );
}

export default App;
