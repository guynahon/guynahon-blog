import './ArticleCardList.css'
import {useContext, useEffect, useState} from "react";
import {ArticleCard} from "../CardComponents/ArticleCard";
import {useLocation} from "react-router-dom";

export function ArticleCardList({subject}) {

    // useState for the value from the input bar that update onChange
    const [inputValue, setInputValue] = useState("");

    // useState for counter the helps us use the Load More function, which loads 3 posts more on each click
    const [loadMoreCounter, setLoadMoreCounter] = useState(3);
    const [postsBySubject, setPostsBySubject] = useState([]);
    const [postsByFilter, setPostsByFilter] = useState([]);

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

    useEffect(() => {
        const fetchSubjectsPosts = async () => {
            try {
                if (inputValue === ""){
                    const response = await fetch(`http://localhost:5000/post?subject=${subject}&from=${loadMoreCounter-2}&to=${loadMoreCounter}`);
                    const jsonData = await response.json();
                    setPostsBySubject([...postsBySubject, ...jsonData]);
                    setPostsByFilter([]);
                } else {
                    const response = await fetch(`http://localhost:5000/post?subject=${subject}&filterBy=${inputValue}`);
                    const jsonData = await response.json();
                    setPostsByFilter(jsonData);
                    setPostsBySubject([]);
                    setLoadMoreCounter(3);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchSubjectsPosts();

    }, [inputValue, loadMoreCounter]);


    return (
    <div className="subject">
        <div className="filter">
            <label className="search-label">Search: </label>
            <input className="search-input" type="text" placeholder="type seach value" onChange={handleInputChange}/>
        </div>
        
        {inputValue === "" ? postsBySubject.map(post => <ArticleCard singlePost={post} key={post.id} />) : 
        postsByFilter.map(post => <ArticleCard singlePost={post} key={post.id} />)}
        
        {(loadMoreCounter <= postsBySubject.length && inputValue === "" ) &&
        <div className="more-articles-block">
            <a className="more-articles-button" onClick={() => setLoadMoreCounter(loadMoreCounter + 3)}>Load More</a>
        </div>}
    </div>
    );
}