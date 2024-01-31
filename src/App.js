import './App.css';
import {Navigation} from "./EveryPageComponents/Navigation";
import {NewsLetter} from "./EveryPageComponents/NewsLetter";
import {Copyright} from "./EveryPageComponents/Copyright";
import {Outlet} from "react-router-dom";
import { useContext } from 'react';
import { DarkContext } from './Providers/DarkProvider';

// only <Outlet/> is replaced depends on the routing path
function App() {

    const {isDarkMode} = useContext(DarkContext);

    return (
        <div id="container" className={`${isDarkMode ? "dark" : ""}`}>
            <Navigation/>
            <Outlet/> {/* THIS IS THE ROUTER*/}
            <NewsLetter/>
            <Copyright/>
        </div>
    );
}

export default App;
