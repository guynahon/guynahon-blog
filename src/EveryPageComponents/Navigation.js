import './Navigation.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../Providers/AuthProvider";

export function Navigation() {

    const {user, signIn} = useContext(AuthContext);

    return (
        <div id="navigation">
            <div id="logo">
                <h1><Link to="/" className="blog-logo">Guy's Blog</Link></h1>
            </div>
            <div id="nav-options">
                <div id="nav-buttons">
                    {user ? `Hello, ${user.userName}` : <button onClick={signIn}>Sign In</button>}
                    <Link to="/subject" className="nav-tag">Daily Digest</Link>
                    <Link to="/subject" className="nav-tag">Design Tools</Link>
                    <Link to="/subject" className="nav-tag">Tutorials</Link>
                    {/* I will change the links once i will have the option to route them correctly*/}
                    {user && <Link to="/admin" className="nav-tag">Admin</Link>}
                </div>
                <a className="sub-button">Subscribe</a>
            </div>
        </div>
    );
}