import {ViewAllButton} from "./ViewAllButton";
import '../Styles/three-cards-list.css'
import {ArticleCard} from "./ArticleCard";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";


export function ThreeCardsList({subject}) {
    const {posts} = useContext(BlogContext);
    const [threePosts, setThreePosts] = useState([]);

    // fetching the first three posts from a subject
    useEffect(() => {
        const fetchHomePagePosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_ROUTE}/post?subject=${subject}&from=1&to=3`);
                const jsonData = await response.json();
                setThreePosts(jsonData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchHomePagePosts();

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
                <h3 className="article-section-header">{articleHeaders[subject]}</h3>
                <ViewAllButton subject={subject}/>
            </div>
            {/* to display each post in the threePosts, we map each post to an ArticleCard component and sending
             the post as "singlePost" param*/}
            {threePosts.map((post) => <ArticleCard singlePost={post} key={post.id} />)}
        </div>
    );
}