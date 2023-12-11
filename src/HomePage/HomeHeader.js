import {HeaderComponent} from "../components/header-component";
import './HomeHeader.css'
export function HomeHeader() {
    return (
        <div id="home-header">
            <div id="home-header-block">
                <div id="home-header-tag">
                    <a id="main-header-button">👋 Meet Personally</a>
                </div>
                <HeaderComponent />
            </div>
        </div>
    );
}