import './Navigation.css'
import {Link, NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {DarkContext} from "../Providers/DarkProvider";
import {scrollToTop} from "../helper-functions/scrollToTop";

// we use this component as the navigation bar in all pages at the top of each page
export function Navigation() {
    // the user var and signIn fn are taken from the AuthContext in order to preform sign-in
    // that will allow us to view the hidden admin panel/page
    const {user, signIn} = useContext(AuthContext);
    const {isDarkMode, setIsDarkMode} = useContext(DarkContext);

    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    }

    const closeMenu = () => {
        setIsMenuActive(false);
    }

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    const closeMenuAndScrollToTop = () => {
        closeMenu();
        scrollToTop();
    }

    return (
        <div className={`navigation ${isDarkMode ? "dark" : ""}`}>
            <nav className="navbar">
                <h1><Link to="/" className={`blog-logo ${isDarkMode ? "dark" : ""}`} onClick={scrollToTop}>Guy's Blog</Link></h1>
                <div className="dark-user">
                    {user ? <span className={`sup ${isDarkMode ? "dark" : ""}`}>{`Hello, ${user.userName}`}</span> : <button className={`sign-in-btn ${isDarkMode ? "dark" : ""}`} onClick={signIn}>Sign In</button>}
                    <input type="checkbox" onChange={toggleDarkMode}/>
                </div>
                <ul className={`nav-menu ${isMenuActive ? "active" : ""}`}>
                    <li className="nav-item">
                        <NavLink to="/subjects/dailydigest" className={`nav-link ${isDarkMode ? "dark" : ""}`} onClick={closeMenuAndScrollToTop}>Daily Digest</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/subjects/designtools" className={`nav-link ${isDarkMode ? "dark" : ""}`} onClick={closeMenuAndScrollToTop}>Design Tools</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/subjects/tutorials" className={`nav-link ${isDarkMode ? "dark" : ""}`} onClick={closeMenuAndScrollToTop}>Tutorials</NavLink>
                    </li>
                    {/*if we signed in we can now see the admin panel link*/}
                    {user && <li className="nav-item">
                        <NavLink to="/admin" className={`nav-link ${isDarkMode ? "dark" : ""}`} onClick={closeMenuAndScrollToTop}>Admin</NavLink>
                    </li>}
                </ul>
                <a className={`sub-button ${isDarkMode ? "dark" : ""}`}>Subscribe</a>
                <div className={`hamburger ${isMenuActive ? "active" : ""}`} onClick={toggleMenu}>
                    <span className={`bar ${isDarkMode ? "dark" : ""}`}></span>
                    <span className={`bar ${isDarkMode ? "dark" : ""}`}></span>
                    <span className={`bar ${isDarkMode ? "dark" : ""}`}></span>
                </div>
            </nav>
        </div>
    );
}

