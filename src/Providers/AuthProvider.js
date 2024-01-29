import {createContext, useState, useEffect} from "react";

// create AuthContext as context
export const AuthContext = createContext(null);

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const signIn = ({userName, password}) => {
        setUser({userName: "Guy"})
    };

    const signOut = () => {
        setUser(null);
    };

    //google OAuth

    useEffect(() => {
        const theUser = localStorage.getItem("user");
    
        if (theUser && !theUser.includes("undefined")) {
          setUser(JSON.parse(theUser));
        }
    }, []);

    const checkAdmin = async () => {
        try {
            if (user) {
                const userRes = await fetch(`http://localhost:5000/users/${user.id}`);
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
    



    const value = {user, signIn, signOut, isAdmin};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

