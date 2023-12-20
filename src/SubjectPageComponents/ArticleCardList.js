import './ArticleCardList.css'
import {useState} from "react";
import {ArticleCard} from "../CardComponents/ArticleCard";

export function ArticleCardList({subjectPosts}) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const filterPosts = (value) => {
        return subjectPosts.filter((post)=> post.title.toLowerCase().includes(value.toLowerCase()));
    }

    return (
    <div className="subject">
        <div className="filter">
            <label className="search-label">Search: </label>
            <input className="search-input" type="text" placeholder="type seach value" onChange={handleInputChange}/>
        </div>
        {filterPosts(inputValue).map((post) => <ArticleCard singlePost={post} />)}
        <div className="more-articles-block">
            <a className="more-articles-button">View all</a>
        </div>
    </div>
    );
}