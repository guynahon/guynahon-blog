import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import './ProfilePicSignOut.css'

export const ProfilePicSignOut = () => {
    const {user} = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
      };

    return (
        <div className="profile">
            <img className="profile-pic" src={user.picture} alt="12"/>
            <button className="logout-btn" onClick={logout}>Log Out</button>
        </div>
    );

}
