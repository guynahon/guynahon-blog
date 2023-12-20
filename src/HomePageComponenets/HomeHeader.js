import {Header} from "../Components/Header";
import './HomeHeader.css'
export function HomeHeader() {
    // the Header of the homepage, built from a Header component and a static mainheader a tag
    return (
        <div id="home-header">
            <div id="home-header-block">
                <div id="home-header-tag">
                    <a id="main-header-button">👋 Meet Personally</a>
                </div>
                <Header />
            </div>
        </div>
    );
}