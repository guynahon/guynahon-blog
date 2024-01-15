import './ArticleCardList.css'
import {useContext, useEffect, useState} from "react";
import {ArticleCard} from "../CardComponents/ArticleCard";
import {useLocation} from "react-router-dom";

export function ArticleCardList({postsBySubject}) {

    // useState for the value from the input bar that update onChange
    const [inputValue, setInputValue] = useState("");

    // useState for counter the helps us use the Load More function, which loads 3 posts more on each click
    const [loadMoreCounter, setLoadMoreCounter] = useState(3);

    // we use useLocation.pathname to get a string with the route we are currently in
    const location = useLocation().pathname;

    // we use the useEffect and track the location meaning we execute that function that resets the counter back
    // to 3 when we leave the route (the make the load more restart)
    useEffect(() => {
        setLoadMoreCounter(3);
    }, [location]);

    // this function is called on input change and sets the inputValue value to what in the input bar
    const handleInputChange = (event) => {
        setInputValue(event.target.value.trim());
    };

    // this function helps filter the posts according to the inputValue without
    // differing lower and upper case letters and returns the filtered array
    const filterPosts = (value) => {
        return postsBySubject.filter((post)=> post.title.toLowerCase().includes(value.toLowerCase()));
    }

    return (
    <div className="subject">
        <div className="filter">
            <label className="search-label">Search: </label>
            <input className="search-input" type="text" placeholder="type seach value" onChange={handleInputChange}/>
        </div>
        {/*if input value is not empty show the filtered posts on the article cards
        else show only the posts you loaded with the load more*/}
        {inputValue !== "" ? filterPosts(inputValue).map((post) => <ArticleCard singlePost={post}  key={post.id} />) :
            postsBySubject.slice(0,loadMoreCounter).map((post) => <ArticleCard singlePost={post}  key={post.id} />)}
        {/*hide the load more button if the counter is larger or equal to the postBySubject length and
        when typing a value in the input bar*/}
        {(loadMoreCounter < postsBySubject.length && inputValue === "" ) &&
        <div className="more-articles-block">
            <a className="more-articles-button" onClick={() => setLoadMoreCounter(loadMoreCounter + 3)}>Load More</a>
        </div>}
    </div>
    );
}