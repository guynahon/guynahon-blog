import './Navigation.css'
import {Link, NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../Providers/AuthProvider";

// we use this component as the navigation bar in all pages at the top of each page
export function Navigation() {
    // the user var and signIn fn are taken from the AuthContext in order to preform sign-in
    // that will allow us to view the hidden admin panel/page
    const {user, signIn} = useContext(AuthContext);

    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    }

    const closeMenu = () => {
        setIsMenuActive(false);
    }

    return (
        <div className="navigation">
            <nav className="navbar">
                <h1><Link to="/" className="blog-logo">Guy's Blog</Link></h1>
                {user ? <span className="sup">{`Hello, ${user.userName}`}</span> : <button className="sign-in-btn" onClick={signIn}>Sign In</button>}
                <ul className={`nav-menu ${isMenuActive ? "active" : ""}`}>
                    <li className="nav-item">
                        <NavLink to="/subjects/dailydigest" className="nav-link" onClick={closeMenu}>Daily Digest</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/subjects/designtools" className="nav-link" onClick={closeMenu}>Design Tools</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/subjects/tutorials" className="nav-link" onClick={closeMenu}>Tutorials</NavLink>
                    </li>
                    {/*if we signed in we can now see the admin panel link*/}
                    {user && <li className="nav-item">
                        <NavLink to="/admin" className="nav-link" onClick={closeMenu}>Admin</NavLink>
                    </li>}
                </ul>
                <a className="sub-button">Subscribe</a>
                <div className={`hamburger ${isMenuActive ? "active" : ""}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </div>
    );
}

