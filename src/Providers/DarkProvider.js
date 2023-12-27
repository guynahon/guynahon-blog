import {createContext, useState} from "react";


export const DarkContext = createContext(null);

export function DarkProvider({children}) {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const value = {isDarkMode, setIsDarkMode};

    return(
        <DarkContext.Provider value={value}>
            {children}
        </DarkContext.Provider>
    );
}