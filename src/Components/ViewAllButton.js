import './ViewAllButton.css'
import {Link} from "react-router-dom";
import {scrollToTop} from "../helper-functions/scrollToTop";

export function ViewAllButton({subject}) {
    const route = `/subjects/${subject}`;

    return (
        <div className="view-all-block">
            <Link to={route} onClick={scrollToTop} className="view-all-button">View all</Link>
        </div>
    );
}