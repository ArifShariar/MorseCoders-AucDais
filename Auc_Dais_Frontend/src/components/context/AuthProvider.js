import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const login = (usertoken) => {
        localStorage.setItem('user', usertoken);
    }

    const logout = () => {
        localStorage.clear();
    }

    function isLogin(){
        return localStorage.getItem('user')
    }

    return (
        <AuthContext.Provider value={{isLogin, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}