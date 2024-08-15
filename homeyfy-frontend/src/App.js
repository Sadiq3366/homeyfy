import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Users from "./components/users/Users";
import Information from "./components/users/profile/Information";
import LandingPage from "./components/home/Home"
import main from "./css/Main.css"
import http from "./http";
import {useState} from "react";
import {useAuth} from "./context/AuthContext";
import VerifyEmail from "./components/VerifyEmail";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




function App() {
    const [error,setError] = useState('');
    const [success,setSuccess] = useState();
    const { checkAuthStatus } = useAuth();
    const handleSubmit = async (users)=>{
        try {
            const login = await http.post('/auth/login',users);
            setSuccess(login.data.message);
            localStorage.setItem('authToken', login.data.authToken);
            await checkAuthStatus();
        } catch (err) {
            setError(err.message);
        }

    }

  return (
    <Router>
        <NavBar />
        <div>
            <Routes>
                <Route path='/' element={<LandingPage />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/login' element={<Login loginAction={handleSubmit}  loginSuccess={success} loginError={error} />}/>
                <Route path='/users' element={<Users />}/>
                <Route path='/profile' element={<Information />}/>
                <Route path='/verify-email/' element={<VerifyEmail />}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
