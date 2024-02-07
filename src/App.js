import './App.css';
import {Navigation} from "./Components/Navigation";
import {NewsLetter} from "./Components/NewsLetter";
import {Copyright} from "./Components/Copyright";
import {Outlet} from "react-router-dom";
import { useContext, useEffect } from 'react';
import { DarkContext } from './Providers/DarkProvider';

// only <Outlet/> is replaced depends on the routing path
function App() {

    const {isDarkMode} = useContext(DarkContext);

    // adds the class 'dark' to the body tag so the backgroud will always be at the correct color.
    useEffect(() => {
        const body = document.body;
        isDarkMode ? body.classList.add('dark') : body.classList.remove('dark');
    }, [isDarkMode])

    return (
        <div id="container">
            <Navigation/>
            <Outlet/> {/* THIS IS THE ROUTER*/}
            <NewsLetter/>
            <Copyright/>
        </div>
    );
}

export default App;
