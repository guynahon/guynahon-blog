import './Navigation.css'

export function Navigation() {
    return (
        <div id="navigation">
            <div id="nav-bar">
                <div id="logo">
                    <h1 className="blog-logo">Guy's Blog</h1>
                </div>
                <div id="nav-options">
                    <div id="nav-buttons">
                        <a className="nav-tag">Daily Digest</a>
                        <a className="nav-tag">Design Tools</a>
                        <a className="nav-tag">Tutorials</a>
                    </div>
                    <a className="sub-button">Subscribe</a>
                </div>
            </div>
        </div>
    );
}