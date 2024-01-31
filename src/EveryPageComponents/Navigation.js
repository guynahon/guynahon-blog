import './Navigation.css'
import {Link, NavLink} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {DarkContext} from "../Providers/DarkProvider";
import {scrollToTop} from "../helper-functions/scrollToTop";
import useFetch from "../hooks/useFetch";
import {ProfilePicSignOut} from './ProfilePicSignOut';

// we use this component as the navigation bar in all pages at the top of each page
export function Navigation() {
    // the user var and signIn fn are taken from the AuthContext in order to preform sign-in
    // that will allow us to view the hidden admin panel/page
    const {user, isAdmin} = useContext(AuthContext);
    const {isDarkMode, setIsDarkMode} = useContext(DarkContext);
    const [isMobile, setIsMobile] = useState(false);

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

    console.log(process.env.REACT_APP_SERVER_ROUTE, process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const { handleGoogle, loading, error } = useFetch(
        `${process.env.REACT_APP_SERVER_ROUTE}/auth`
      );
    
    useEffect(() => {
        /* global google */
        if (window.google) {
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogle,
        });
    
        google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
            type: `${isMobile ? "icon" : "standard"}`,
            theme: `filled_${isDarkMode ? "black" : "white"}`,
            size: "large",
            text: "continue_with",
            shape: "pill",
        });
    
        // google.accounts.id.prompt()
        }
    }, [handleGoogle]);

    // check if im on mobile size
    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      setIsMobile(mediaQuery.matches);
      const handleResize = () => {
        setIsMobile(mediaQuery.matches);
      };
      mediaQuery.addEventListener('change', handleResize);
      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }, []);

    return (
        <div className="navigation">
            <nav className="navbar">
                <h1><Link to="/" className="blog-logo" onClick={scrollToTop}>Guy's Blog</Link></h1>
                <div className="dark-user">
                    {loading ? (
                            <div>Loading....</div>
                        ) : (user ? <ProfilePicSignOut /> :
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
                    {/*if we signed in we can now see the admin panel link*/}
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

