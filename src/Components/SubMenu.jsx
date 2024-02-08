import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import './SubMenu.css';
import profileImage from '../images/profile.png';
import logoutImage from '../images/logout.png';


export const SubMenu = () => {

    const {user, logOut} = useContext(AuthContext);
    const [subMenu, setSubMenu] = useState(false);

    const toggleMenu = () => {
        setSubMenu(!subMenu);
    };

    return (
        <div className="hero">
        <nav className='sub-menu-nav'>
            <img src={user.picture} className="user-pic" onClick={toggleMenu}/>

            <div className={`sub-menu-wrap ${subMenu ? "open-menu" : ""}`} id="subMenu">
                <div className="sub-menu">
                    <div className="user-info">
                        <img src={user.picture}/>
                        <div className="name-and-email">
                            <h3>{`${user.firstName} ${user.lastName}`}</h3>
                            <h5>{user.email}</h5>
                        </div>
                    </div>
                    
                    <hr/>

                    <a href="#" className="sub-menu-link">
                        <img src={profileImage}/>
                        <p>My Posts</p>
                        <span>{"•"}</span>
                    </a>

                    <button href="#" className="sub-menu-button" onClick={logOut}>
                        <img src={logoutImage}/>
                        <p>Logout</p>
                        <span>{"•"}</span>
                    </button>

                </div>
            </div>
        </nav>
    </div>
    );
}