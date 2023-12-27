import './NewsLetter.css'
import {useContext} from "react";
import {DarkContext} from "../Providers/DarkProvider";
export function NewsLetter() {

    const {isDarkMode} = useContext(DarkContext);

    // static newsletter component
    return (
        <div className={`news-letter ${isDarkMode ? "dark" : ""}`}>
            <div className={`news-letter-text ${isDarkMode ? "dark" : ""}`}>
                <h3 className={`news-letter-header ${isDarkMode ? "dark" : ""}`}>Guy's Blog Newsletter</h3>
                <p className={`news-letter-paragraph ${isDarkMode ? "dark" : ""}`}>A bi-weekly newsletter of design inspiration, resources and anything related to career development.</p>
            </div>
            <div className={`news-letter-email-box ${isDarkMode ? "dark" : ""}`}>
                <input className={`news-letter-input ${isDarkMode ? "dark" : ""}`} type="text" placeholder="Email Address"/>
                <a className={`news-letter-button ${isDarkMode ? "dark" : ""}`}>Subscribe</a>
            </div>
        </div>
    );
}