import React, {createContext, useContext, useEffect, useState} from "react";
import http from "../http";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [loginUserType, setLoginUserType] = useState();
    const [loginUserId, setLoginUserId] = useState();

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('authToken');
        if(token){
            try {
                const response = await http.get('check_user/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoginUserId(response.data.user_id);
                setLoginUserType(response.data.user_type);
            } catch (err) {
                console.error('Error checking authentication status:', err);
            }
        }else {
            setLoginUserId(null);
            setLoginUserType(null);
        }

    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ loginUserType, loginUserId, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);
