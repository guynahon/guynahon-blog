import './Subject-component.css'
import {useContext, useEffect, useState} from "react";
import {ArticleCardsList} from "../CardComponents/ArticleCardsList";
import {BlogContext} from "../Providers/BlogProvider";


export function SubjectComponent() {
    const {posts} = useContext(BlogContext);
    const [inputValue, setInputValue] = useState("");


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    const filterPosts = (value) => {
        return posts.filter((post)=> post.title.includes(value));
    }

    return (
    <div className="subject">
        <div className="filter">
            <label className="search-label">Search: </label>
            <input className="search-input" type="text" placeholder="type seach value" onChange={handleInputChange}/>
        </div>
        <ArticleCardsList posts={filterPosts(inputValue)} />
        <div className="more-articles-block">
            <a className="more-articles-button">View all</a>
        </div>
    </div>
    );
}