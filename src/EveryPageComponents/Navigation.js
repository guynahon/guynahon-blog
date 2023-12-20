import './Navigation.css'
import {Link, NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../Providers/AuthProvider";

// we use this component as the navigation bar in all pages at the top of each page
export function Navigation() {
    // the user var and signIn fn are taken from the AuthContext in order to preform sign-in
    // that will allow us to view the hidden admin panel/page
    const {user, signIn} = useContext(AuthContext);

    return (
        <div id="navigation">
            <div id="logo">
                <h1><Link to="/" className="blog-logo">Guy's Blog</Link></h1>
            </div>
            <div id="nav-options">
                <div id="nav-buttons">
                    {/*if we signed in we will show "Hello "name" else the sign-in button*/}
                    {user ? `Hello, ${user.userName}` : <button className="sign-in-btn" onClick={signIn}>Sign In</button>}
                    <NavLink to="/dailydigest" className="nav-tag">Daily Digest</NavLink>
                    <NavLink to="/designtools" className="nav-tag">Design Tools</NavLink>
                    <NavLink to="/tutorials" className="nav-tag">Tutorials</NavLink>
                    {/*if we signed in we can now see the admin panel link*/}
                    {user && <NavLink to="/admin" className="nav-tag">Admin</NavLink>}
                </div>
                <a className="sub-button">Subscribe</a>
            </div>
        </div>
    );
}