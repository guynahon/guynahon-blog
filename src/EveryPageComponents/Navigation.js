import './Navigation.css'
import {Link} from "react-router-dom";

export function Navigation() {
    return (
        <div id="navigation">
            <div id="nav-bar">
                <div id="logo">
                    <h1><Link to="/" className="blog-logo">Guy's Blog</Link></h1>
                </div>
                <div id="nav-options">
                    <div id="nav-buttons">
                        <Link to="/subject" className="nav-tag">Daily Digest</Link>
                        <Link to="/subject" className="nav-tag">Design Tools</Link>
                        <Link to="/subject" className="nav-tag">Tutorials</Link>
                        {/* I will change the links once i will have the option to route them correctly */}
                    </div>
                    <a className="sub-button">Subscribe</a>
                </div>
            </div>
        </div>
    );
}