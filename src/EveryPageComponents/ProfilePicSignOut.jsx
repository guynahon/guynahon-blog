import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import './ProfilePicSignOut.css'

export const ProfilePicSignOut = () => {
    const {user, logOut} = useContext(AuthContext);

    return (
        <div className="profile">
            <img className="profile-pic" src={user.picture} alt="12"/>
            <button className="logout-btn" onClick={logOut}>Log Out</button>
        </div>
    );

}
