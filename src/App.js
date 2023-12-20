import './App.css';
import {Navigation} from "./EveryPageComponents/Navigation";
import {NewsLetter} from "./EveryPageComponents/NewsLetter";
import {Copyright} from "./EveryPageComponents/Copyright";
import {Outlet} from "react-router-dom";

// only <Outlet/> is replaced depends on the routing path
function App() {
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
