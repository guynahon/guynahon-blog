import {ThreeCardsList} from "./ThreeCardsList";
import './ArticlesBySubjects.css'

// this component helps us get 3 article cards from each subject (3 in total) and display them
export function ArticlesBySubjects() {
    return (
        <div id="articles">
            <ThreeCardsList subject={"dailydigest"} />
            <ThreeCardsList subject={"designtools"}/>
            <ThreeCardsList subject={"tutorials"}/>
        </div>
    );
}