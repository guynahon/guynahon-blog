import './SingleArticle.css'
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BlogContext} from "../Providers/BlogProvider";

export function SingleArticle() {
    const {id} = useParams();
    const {posts} = useContext(BlogContext);

    const post = posts.find((element) => element.id === Number(id)); // getPostById

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