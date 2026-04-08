import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('zm_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Simulated login logic
        let role = 'user';
        if (email === 'admin@zmstore.com' && password === 'admin123') {
            role = 'admin';
        }

        const newUser = { email, role, name: email.split('@')[0] };
        setUser(newUser);
        localStorage.setItem('zm_user', JSON.stringify(newUser));
        return newUser;
    };

    const register = (email, password, name) => {
        // Simulated registration logic
        const newUser = { email, role: 'user', name };
        setUser(newUser);
        localStorage.setItem('zm_user', JSON.stringify(newUser));
        return newUser;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('zm_user');
    };

    const isAdmin = user?.role === 'admin';
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            isAdmin,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};
