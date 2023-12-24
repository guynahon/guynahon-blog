import './Copyright.css'
import igLogo from '../iglogo.png';
import gitLogo from '../gitlogo.png';
import liLogo from '../lilogo.png';
export function Copyright() {
    // static copyright and social media (git-hub, instagram and linked-in) component
    return (
        <div className="copy-right">
            <span id="copy-right-message">Copyright 2024 - Guy Nahon</span>
            <div id="logo">
                <div className="logos">
                    <a href="https://github.com/guynahon" target="_blank"><img src={gitLogo} alt="gitlogo"/></a>
                </div>
                <div className="logos">
                    <a href="https://www.linkedin.com/in/guy-nahon-945723253/" target="_blank"><img src={liLogo} alt="lilogo"/></a>
                </div>
                <div className="logos">
                    <a href="https://www.instagram.com/guynahon/" target="_blank"><img src={igLogo} alt="iglogo"/></a>
                </div>
            </div>
        </div>
    );
}