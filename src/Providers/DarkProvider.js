import {createContext, useEffect, useState} from "react";


export const DarkContext = createContext(null);

export function DarkProvider({children}) {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeState = localStorage.getItem("darkMode");
        if (darkModeState) {
            setIsDarkMode(JSON.parse(darkModeState));
        }
    }, []);

    const value = {isDarkMode, setIsDarkMode};

    return(
        <DarkContext.Provider value={value}>
            {children}
        </DarkContext.Provider>
    );
}