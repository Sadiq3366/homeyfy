import React, { createContext, useContext, useEffect, useState } from "react";
import http from "../http";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loginUserType, setLoginUserType] = useState(null);
    const [loginUserId, setLoginUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logout = () => {
        localStorage.removeItem('authToken');
        setLoginUserId(null);
        setLoginUserType(null);
        setIsAuthenticated(false);
    };

    const checkAuthStatus = async () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const response = await http.get("check_user/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoginUserId(response.data.user_id);
                setLoginUserType(response.data.user_type);
                setIsAuthenticated(true);
            } catch (err) {
                console.error("Auth check failed. Logging out.");
                logout(); // Token expired or invalid
            }
        } else {
            logout(); // No token found
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ loginUserType, loginUserId, isAuthenticated, checkAuthStatus, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
