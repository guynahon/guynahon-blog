import './Subject.css'
import {ArticleCard} from "./Card";

export function Subject() {
    return (
    <div className="subject">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <div className="more-articles-block">
            <a className="more-articles-button">View all</a>
        </div>
    </div>
    );
}