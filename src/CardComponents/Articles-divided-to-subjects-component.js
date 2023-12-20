import {ThreeCardsList} from "./ThreeCardsList";
import './Articles-divided-to-subjects-component.css'

export function ArticlesDividedToSubjectsComponent() {
    return (
        <div id="articles">
            <ThreeCardsList subject={"dailydigest"} />
            <ThreeCardsList subject={"designtools"}/>
            <ThreeCardsList subject={"tutorials"}/>
        </div>
    );
}