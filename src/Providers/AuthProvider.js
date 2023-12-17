import {createContext, useState} from "react";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    const signIn = ({userName, password}) => {
        setUser({userName: "Guy"})
    };

    const signOut = () => {
        setUser(null);
    };

    const value = {user, signIn, signOut};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

