import {ThreeCardsList} from "./ThreeCardsList";
import './ArticlesBySubjects.css'
import {useContext} from "react";
import {DarkContext} from "../Providers/DarkProvider";

// this component helps us get 3 article cards from each subject (3 in total) and display them
export function ArticlesBySubjects() {

    const {isDarkMode} = useContext(DarkContext);

    return (
        <div className={`articles ${isDarkMode ? "dark" : ""}`}>
            <ThreeCardsList subject={"dailydigest"} />
            <ThreeCardsList subject={"designtools"}/>
            <ThreeCardsList subject={"tutorials"}/>
        </div>
    );
}