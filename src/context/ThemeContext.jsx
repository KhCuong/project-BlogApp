// ThemeContext là một context tạo ra bằng React hook createContext. 
// lưu trữ trạng thái theme và các hành động thay đổi theme

"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const value = localStorage.getItem("theme");
        return value || "light";
    }
};

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return getFromLocalStorage();
    });

    const toggle = () => {
        return theme === "light" ? setTheme("dark") : setTheme("light");
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);

    }), [theme];


    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};
