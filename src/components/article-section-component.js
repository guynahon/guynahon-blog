import {ArticleCard} from "./article-card-component";
import './article-section-component.css'

export function ArticleSection() {
    return (
        <div className="article-section">
            <div className="header-view-all">
                <h3 className="article-section-header">Daily Digest</h3>
                <div className="view-all-block">
                    <a className="view-all-button">View all</a>
                </div>
            </div>
            <ArticleCard/>
            <ArticleCard/>
            <ArticleCard/>
        </div>

    );
}