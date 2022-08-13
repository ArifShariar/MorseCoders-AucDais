import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const login = (response) => {
        localStorage.setItem('user', response.data.token);
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('user_name', (response.data.user.firstName + " " + response.data.user.lastName));
        //console.log(typeof response.data.user.image);
        localStorage.setItem('user_image', response.data.user.image);
    }

    const logout = () => {
        localStorage.clear();
    }

    const setName = (name) => {
        console.log("Here we go again");
        localStorage.setItem('user_name', name);
    }

    const setImage = (image) => {
        localStorage.setItem('user_image', image);
    }

    function getName() {
        return localStorage.getItem('user_name');
    }

    function getImage() {
        return localStorage.getItem('user_image');
    }

    function isLogin(){
        return localStorage.getItem('user')
    }

    return (
        <AuthContext.Provider value={{isLogin, login, logout, setName, setImage, getName, getImage}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}