import {ViewAllButton} from "../Components/ViewAllButton";
import './ThreeCardsSection.css'
import {ThreeCardsList} from "./ThreeCardsList";

export function ThreeCardsSection({posts}) {


    return (
        <div className="article-section">
            <div className="header-view-all">
                <h3 className="article-section-header">Daily Digest</h3>
                <ViewAllButton />
            </div>
            <ThreeCardsList posts={posts}/>
        </div>

    );
}