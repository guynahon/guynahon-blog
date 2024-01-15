import './ArticleCardList.css'
import {useEffect, useState} from "react";
import {ArticleCard} from "../CardComponents/ArticleCard";

export function ArticleCardList({subject}) {

    // useState for the value from the input bar that update onChange
    const [inputValue, setInputValue] = useState("");

    // useState for counter the helps us use the Load More function, which loads 3 posts more on each click
    const [loadMoreCounter, setLoadMoreCounter] = useState(3);
    const [postsBySubject, setPostsBySubject] = useState([]);
    const [postsByFilter, setPostsByFilter] = useState([]);



    useEffect(() => {
        setPostsBySubject([]);
    }, [subject]);



    const handleInputChange = (event) => {
        setInputValue(event.target.value.trim());
    };



    const fetchSubjectsPosts = async (clickedLoadMore) => {

        const loadCounter = clickedLoadMore ? (loadMoreCounter + 3) : 3;
        setLoadMoreCounter(loadCounter);

        try {
            const url = `http://localhost:5000/post?subject=${subject}`;
            if (inputValue === "") {
                const response = await fetch(`${url}&from=${loadCounter-2}&to=${loadCounter}`);
                const jsonData = await response.json();
                setPostsBySubject(prevPosts => [...prevPosts, ...jsonData]);
                setPostsByFilter([]);
            } else {
                const response = await fetch(`${url}&filterBy=${inputValue}`);
                const jsonData = await response.json();
                setPostsByFilter(jsonData);
                setPostsBySubject([]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };



    useEffect(() => {
        fetchSubjectsPosts();
    }, [subject, inputValue]);

    

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
            <a className="more-articles-button" onClick={() => fetchSubjectsPosts(true)}>Load More</a>
        </div>}
    </div>
    );
}