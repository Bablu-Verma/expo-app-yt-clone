import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
    theme: ThemeMode;
    isDark: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    isDark: true,
    toggleTheme: () => { },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeMode>("dark");

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem("app_theme");
            if (savedTheme === "light" || savedTheme === "dark") {
                setTheme(savedTheme);
            } else {
                setTheme(systemTheme === "light" ? "light" : "dark");
            }
        } catch {
            setTheme("dark");
        }
    };

    const toggleTheme = async () => {
        const newTheme: ThemeMode = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        try {
            await AsyncStorage.setItem("app_theme", newTheme);
        } catch {
            // Silently fail
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};