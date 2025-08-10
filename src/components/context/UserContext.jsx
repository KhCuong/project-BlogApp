"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function fetchUserFromToken() {
        try {
            const res = await fetch("/api/auth/me?ts=" + Date.now()); // tránh cache
            if (res.ok) {
                const data = await res.json();
                if (data.user) setUser(data.user);
            }
        } catch { }
    }
    useEffect(() => {
        fetchUserFromToken();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        fetchUserFromToken(); // cập nhật lại user từ cookie
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
