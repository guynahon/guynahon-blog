import './Subject-component.css'
import {ArticleCard} from "../CardComponents/ArticleCard";
import {useEffect, useState} from "react";
import {ArticleCardsList} from "../CardComponents/ArticleCardsList";


export function SubjectComponent() {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
            .then(json => setPosts(json));
    }, []);

    return (
    <div className="subject">
        <ArticleCardsList posts={posts} />
        <div className="more-articles-block">
            <a className="more-articles-button">View all</a>
        </div>
    </div>
    );
}