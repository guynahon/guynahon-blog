import '../Styles/article-card-list.css'
import {useEffect, useState} from "react";
import {ArticleCard} from "./ArticleCard";

export function ArticleCardList({subject}) {

    const [inputValue, setInputValue] = useState("");
    const [postsBySubject, setPostsBySubject] = useState([]);
    const [postsByFilter, setPostsByFilter] = useState([]);
    const [loadMoreCounter, setLoadMoreCounter] = useState(3);
    const [isMorePosts, setIsMorePosts] = useState(false);

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
            const url = `${process.env.REACT_APP_SERVER_ROUTE}/post?subject=${subject}`;
            if (inputValue === "") {
                const response = await fetch(`${url}&from=${loadCounter-2}&to=${loadCounter+1}`);
                const jsonData = await response.json();
                if (JSON.stringify(jsonData) === JSON.stringify(jsonData.slice(0,3))) {
                    setIsMorePosts(false);
                } else {
                    setIsMorePosts(true);
                }
                setPostsBySubject(prevPosts => [...prevPosts, ...jsonData.slice(0,3)]);
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
        {(isMorePosts && inputValue === "" ) &&
        <div className="more-articles-block">
            <button className="more-articles-button" onClick={() => fetchSubjectsPosts(true)}>Load More</button>
        </div>}
    </div>
    );
}