import '../Styles/navigation.css'
import {Link, NavLink} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {DarkContext} from "../Providers/DarkProvider";
import {scrollToTop} from "../helper-functions/scrollToTop";
import { SubMenu } from './SubMenu';

export function Navigation() {
    const {user, isAdmin, loading} = useContext(AuthContext);
    const {isDarkMode, setIsDarkMode} = useContext(DarkContext);

    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    const closeMenu = () => {
        setIsMenuActive(false);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
    };

    const closeMenuAndScrollToTop = () => {
        closeMenu();
        scrollToTop();
    };

    return (
        <div className="navigation">
            <nav className="navbar">
                <h1><Link to="/" className="blog-logo" onClick={scrollToTop}>Guy's Blog</Link></h1>
                <div className="dark-user">
                    {loading ? (
                            <div>Loading....</div>
                        ) : (user ? <SubMenu/> :
                            <div id="signUpDiv" data-text="signup_with"></div>
                        )}
                </div>
                <ul className={`nav-menu ${isMenuActive ? "active" : ""}`}>
                    <li className="nav-item">
                        <NavLink to="/subjects/dailydigest" className="nav-link" onClick={closeMenuAndScrollToTop}>Daily Digest</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/subjects/designtools" className="nav-link" onClick={closeMenuAndScrollToTop}>Design Tools</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/subjects/tutorials" className="nav-link" onClick={closeMenuAndScrollToTop}>Tutorials</NavLink>
                    </li>
                    {/*if we signed in and have permissions we can now see the admin panel link*/}
                    {isAdmin && <li className="nav-item">
                        <NavLink to="/admin" className="nav-link" onClick={closeMenuAndScrollToTop}>Admin</NavLink>
                    </li>}
                </ul>
                <input className="dark-mode-btn" type="checkbox" onChange={toggleDarkMode} checked={isDarkMode}/>
                <div className={`hamburger ${isMenuActive ? "active" : ""}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </div>
    );
}

