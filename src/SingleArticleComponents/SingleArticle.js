import './SingleArticle.css'
import {useContext} from "react";
import {useParams} from "react-router-dom";
import {BlogContext} from "../Providers/BlogProvider";

export function SingleArticle() {

    // getting the id from the route in order to display the specific post
    const {id} = useParams();

    //getting the posts array to search the post in it
    const {posts} = useContext(BlogContext);

    // getting the post by the id
    const post = posts.find((element) => element.id === Number(id));

    return (
            <div className="single-article-block">
                { post ? (
                    <>
                        <img className="larger-img" src="../large-article.jpeg" alt="large"/>
                        <div className="article-paragraphs">
                            <p className="single-paragraph">{post.body}</p>
                            <img className="smaller-img" src="../small-article.jpeg" alt="small"/>
                            <div className="img-caption">
                                <h5>Image Caption Or Credit</h5>
                            </div>
                            <p className="single-paragraph">{post.body}</p>
                            <div className="middle-header">
                                <h4>{post.title}</h4>
                            </div>
                            <p className="single-paragraph">{post.body} </p>
                        </div>
                    </>
                    ) : (
                        <span className="loading-msg">Loading...</span>
                    )}
            </div>
    );
}