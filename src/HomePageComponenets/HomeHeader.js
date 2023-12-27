import {Header} from "../Components/Header";
import './HomeHeader.css'
import {useContext} from "react";
import {DarkContext} from "../Providers/DarkProvider";
export function HomeHeader() {
    const{isDarkMode} = useContext(DarkContext);
    // the Header of the homepage, built from a Header component and a static mainheader a tag
    return (
        <div className={`home-header ${isDarkMode ? "dark" : ""}`}>
            <div className="home-header-block">
                <div className={`home-header-tag ${isDarkMode ? "dark" : ""}`}>
                    <a className="main-header-button">👋 Meet Personally</a>
                </div>
                <Header />
            </div>
        </div>
    );
}