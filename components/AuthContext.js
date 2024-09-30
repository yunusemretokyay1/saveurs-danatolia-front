// components/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"; // Çerezleri kontrol etmek için js-cookie kütüphanesi
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get("token");  // Çerezi kontrol ediyoruz
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setUser({ userId: decoded.userId, email: decoded.email });
            } catch (error) {
                console.error("Geçersiz token:", error);
                setUser(null);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
