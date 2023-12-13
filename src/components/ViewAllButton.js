import './ViewAllButton.css'
import {Link} from "react-router-dom";
export function ViewAllButton() {
    return (
        <div className="view-all-block">
            <Link to="/subject" className="view-all-button">View all</Link>
        </div>
    );
}