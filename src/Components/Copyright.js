import '../Styles/copyright.css'

export function Copyright() {

    // static copyright and social media (git-hub, instagram and linked-in) component
    return (
        <div className="copy-right">
            <span className="copy-right-message">Copyright 2024 - Guy Nahon</span>
            <div className="social-logos">
                <div className="social-logo">
                    <a href="https://github.com/guynahon" target="_blank"><img src="/gitlogo.png" alt="gitlogo"/></a>
                </div>
                <div className="social-logo">
                    <a href="https://www.linkedin.com/in/guy-nahon-945723253/" target="_blank"><img src="/lilogo.png" alt="lilogo"/></a>
                </div>
                <div className="social-logo">
                    <a href="https://www.instagram.com/guynahon/" target="_blank"><img src="/iglogo.png" alt="iglogo"/></a>
                </div>
            </div>
        </div>
    );
}