import {Header} from "./Header";
import './HomeHeader.css'
export function HomeHeader() {
    // the Header of the homepage, built from a Header component and a static mainheader a tag
    return (
        <div className="home-header">
            <div className="home-header-block">
                <div className="home-header-tag">
                    <a className="main-header-button">👋 Meet Personally</a>
                </div>
                <Header />
            </div>
        </div>
    );
}