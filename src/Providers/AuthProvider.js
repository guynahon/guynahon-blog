import {createContext, useState} from "react";

// create AuthContext as context
export const AuthContext = createContext(null);

export function AuthProvider({children}) {

    // user initial value set to null
    const [user, setUser] = useState(null);

    // this method is hard coded sign in the user as "Guy"
    const signIn = ({userName, password}) => {
        setUser({userName: "Guy"})
    };

    // this method is signing out the user
    const signOut = () => {
        setUser(null);
    };

    // the values to pass to AuthProvider's children (useContext(AuthContext))
    const value = {user, signIn, signOut};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

