import './Navigation.css'
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../Providers/AuthProvider";

export function Navigation() {

    const {user, signIn} = useContext(AuthContext);

    return (
        <div id="navigation">
            <div id="logo">
                <h1><NavLink to="/" className="blog-logo">Guy's Blog</NavLink></h1>
            </div>
            <div id="nav-options">
                <div id="nav-buttons">
                    {user ? `Hello, ${user.userName}` : <button className="sign-in-btn" onClick={signIn}>Sign In</button>}
                    <NavLink to="/dailydigest" className="nav-tag">Daily Digest</NavLink>
                    <NavLink to="/designtools" className="nav-tag">Design Tools</NavLink>
                    <NavLink to="/tutorials" className="nav-tag">Tutorials</NavLink>
                    {/* I will change the links once i will have the option to route them correctly*/}
                    {user && <NavLink to="/admin" className="nav-tag">Admin</NavLink>}
                </div>
                <a className="sub-button">Subscribe</a>
            </div>
        </div>
    );
}