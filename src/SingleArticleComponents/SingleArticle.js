import './SingleArticle.css'
import {useContext} from "react";
import {useParams} from "react-router-dom";
import {BlogContext} from "../Providers/BlogProvider";
import {DarkContext} from "../Providers/DarkProvider";

export function SingleArticle() {

    const {isDarkMode} = useContext(DarkContext);

    // getting the id from the route in order to display the specific post
    const {id} = useParams();

    //getting the posts array to search the post in it
    const {posts} = useContext(BlogContext);

    // getting the post by the id
    const post = posts.find((element) => element.id === Number(id));

    return (
            <div className={`single-article-block ${isDarkMode ? "dark" : ""}`}>
                { post ? (
                    <>
                        <div className="image-container">
                            <img className="larger-img" src={`https://picsum.photos/300/300?${id}`} alt={"random-picture "+id}/>
                        </div>
                        <div className="article-paragraphs">
                            <p className={`single-paragraph ${isDarkMode ? "dark" : ""}`}>{post.body}</p>
                        </div>
                    </>
                    ) : (
                        // loading message until the post loads.
                    <div className={`loading-bg ${isDarkMode ? "dark" : ""}`}>
                        <span className={`loading-msg ${isDarkMode ? "dark" : ""}`}>Loading...</span>
                    </div>
                    )}
            </div>
    );
}