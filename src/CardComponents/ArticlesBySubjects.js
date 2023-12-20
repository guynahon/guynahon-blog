import {ThreeCardsList} from "./ThreeCardsList";
import './ArticlesBySubjects.css'

export function ArticlesBySubjects() {
    return (
        <div id="articles">
            <ThreeCardsList subject={"dailydigest"} />
            <ThreeCardsList subject={"designtools"}/>
            <ThreeCardsList subject={"tutorials"}/>
        </div>
    );
}