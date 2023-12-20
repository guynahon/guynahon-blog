import {ViewAllButton} from "../Components/ViewAllButton";
import './ThreeCardsList.css'
import {ArticleCard} from "./ArticleCard";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";
import {filterPostsBySubject} from "../helper-functions/filterPostsBySubject";

export function ThreeCardsList({subject}) {
    const {posts} = useContext(BlogContext);
    const [threePosts, setThreePosts] = useState([]);

    useEffect(() => {
        setThreePosts(filterPostsBySubject(subject, posts).slice(0,3));
    }, [posts]);

    const articleHeaders = {
        "dailydigest": "Daily Digest",
        "designtools": "Design Tools",
        "tutorials": "Tutorials"
    }

    return (
        <div className="article-section">
            <div className="header-view-all">
                <h3 className="article-section-header">{articleHeaders[subject]}</h3>
                <ViewAllButton subject={subject}/>
            </div>
            {threePosts.map((post) => <ArticleCard singlePost={post} />)}
        </div>
    );
}