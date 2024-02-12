import {createContext, useState, useEffect, useContext} from "react";
import { jwtDecode } from 'jwt-decode';
import useFetch from "../hooks/useFetch";
import { DarkContext } from "./DarkProvider";

// create AuthContext as context
export const AuthContext = createContext(null);

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const {isDarkMode} = useContext(DarkContext);
    const [isMobile, setIsMobile] = useState(false);

    
    const { handleGoogle, loading, error } = useFetch(
        `${process.env.REACT_APP_SERVER_ROUTE}/auth`
      );
    
    
    useEffect(() => {
        /* global google */
        if (window.google) {
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogle,
        });
    
        google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
            type: `${isMobile ? "icon" : "standard"}`,
            theme: `filled_${isDarkMode ? "black" : "white"}`,
            size: "large",
            text: "continue_with",
            shape: "pill",
        });
    
        // google.accounts.id.prompt()
        }
    }, [handleGoogle]);

    // check if user on mobile size and changes the google button accordingly
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);
        const handleResize = () => {
            setIsMobile(mediaQuery.matches);
        };
        mediaQuery.addEventListener('change', handleResize);
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
        }, []);

    const logOut = () => {
        localStorage.removeItem("user");
        window.location.reload();
      };

    //google OAuth
    useEffect(() => {
        const theToken = localStorage.getItem("user");
        if (theToken && !theToken.includes('undefined')) {
            const theUser = jwtDecode(JSON.parse(theToken).token);
            setUser(theUser);
        }
    }, []);

    const checkAdmin = async () => {
        try {
            if (user) {
                const userRes = await fetch(`${process.env.REACT_APP_SERVER_ROUTE}/users/${user.id}`);
                const theUser = await userRes.json();
                setIsAdmin(theUser.admin)
            }
            } catch (err) {
                console.error(err.message);
            }
    };

    useEffect(() => {
        checkAdmin();
    }, [user]);

    const value = {user, isAdmin, loading, error, logOut};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

