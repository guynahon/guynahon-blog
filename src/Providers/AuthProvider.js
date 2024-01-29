import {createContext, useState, useEffect} from "react";

// create AuthContext as context
export const AuthContext = createContext(null);

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);

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


    const value = {user, signIn, signOut};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

