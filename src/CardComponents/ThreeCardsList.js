import {ViewAllButton} from "../Components/ViewAllButton";
import './ThreeCardsList.css'
import {ArticleCard} from "./ArticleCard";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";
import {filterPostsBySubject} from "../helper-functions/filterPostsBySubject";
import {DarkContext} from "../Providers/DarkProvider";

// this component gets the subject as param from its father component and based on it
export function ThreeCardsList({subject}) {
    const {isDarkMode} = useContext(DarkContext);
    // posts array from the BlogContext
    const {posts} = useContext(BlogContext);
    const [threePosts, setThreePosts] = useState([]);

    // we run the function if the posts changed, because we are getting them from the local storage,
    // the small delay can get us an empty array, so we track the change in posts running the function inside
    // the useEffect on every change. the function inside return an array of posts filtered by subject
    // and sets its value to the threePost useState.
    useEffect(() => {
        setThreePosts(filterPostsBySubject(subject, posts).slice(0,3));
    }, [posts]);

    // an object that help us set the article-section-header based on the subject we got as param
    const articleHeaders = {
        "dailydigest": "Daily Digest",
        "designtools": "Design Tools",
        "tutorials": "Tutorials"
    }

    return (
        <div className="article-section">
            <div className="header-view-all">
                <h3 className={`article-section-header ${isDarkMode ? "dark" : ""}`}>{articleHeaders[subject]}</h3>
                <ViewAllButton subject={subject}/>
            </div>
            {/* to display each post in the threePosts, we map each post to an ArticleCard component and sending
             the post as "singlePost" param*/}
            {threePosts.map((post) => <ArticleCard singlePost={post} key={post.id} />)}
        </div>
    );
}