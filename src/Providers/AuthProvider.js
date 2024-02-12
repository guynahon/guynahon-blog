import {createContext, useState, useEffect} from "react";
import { jwtDecode } from 'jwt-decode';

// create AuthContext as context
export const AuthContext = createContext(null);

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

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

    const value = {user, isAdmin, logOut};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

