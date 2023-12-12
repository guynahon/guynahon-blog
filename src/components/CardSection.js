import {ArticleCard} from "./Card";
import {ViewAllButton} from "./ViewAllButton";
import './CardSection.css'

export function ArticleSection() {
    return (
        <div className="article-section">
            <div className="header-view-all">
                <h3 className="article-section-header">Daily Digest</h3>
                <ViewAllButton />
            </div>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
        </div>

    );
}