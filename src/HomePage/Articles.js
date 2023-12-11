import {ArticleSection} from "../components/article-section-component";
import './Articles.css'

export function Articles() {
    return (
        <div id="articles">
            <ArticleSection/>
            <ArticleSection/>
            <ArticleSection/>
        </div>
    );
}