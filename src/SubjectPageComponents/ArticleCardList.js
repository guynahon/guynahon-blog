import './ArticleCardList.css'
import {useEffect, useState} from "react";
import {ArticleCard} from "../CardComponents/ArticleCard";
import {useLocation} from "react-router-dom";

export function ArticleCardList({postsBySubject}) {
    const [inputValue, setInputValue] = useState("");
    const [counter, setCounter] = useState(3);
    const location = useLocation();

    useEffect(() => {
        setCounter(3);
    }, [location]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const filterPosts = (value) => {
        return postsBySubject.filter((post)=> post.title.toLowerCase().includes(value.toLowerCase()));
    }

    return (
    <div className="subject">
        <div className="filter">
            <label className="search-label">Search: </label>
            <input className="search-input" type="text" placeholder="type seach value" onChange={handleInputChange}/>
        </div>
        {inputValue !== "" ? filterPosts(inputValue).map((post) => <ArticleCard singlePost={post} />) :
            postsBySubject.slice(0,counter).map((post) => <ArticleCard singlePost={post} />)}
        {counter < postsBySubject.length &&
        <div className="more-articles-block">
            <a className="more-articles-button" onClick={() => setCounter(counter + 3)}>Load More</a>
        </div>}
    </div>
    );
}