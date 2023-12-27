import './ViewAllButton.css'
import {Link} from "react-router-dom";
import {scrollToTop} from "../helper-functions/scrollToTop";
import {useContext} from "react";
import {DarkContext} from "../Providers/DarkProvider";

// view all button component - for linking to the subject page
export function ViewAllButton({subject}) {
    const {isDarkMode} = useContext(DarkContext);

    const route = `/subjects/${subject}`;

    return (
        <div className="view-all-block">
            <Link to={route} onClick={scrollToTop} className={`view-all-button ${isDarkMode ? "dark" : ""}`}>View all</Link>
        </div>
    );
}