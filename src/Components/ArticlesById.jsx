import '../Styles/article-card-list.css'
import {useContext, useEffect, useState} from "react";
import {ArticleCard} from "./ArticleCard";
import { BlogContext } from '../Providers/BlogProvider';
import { useNavigate } from 'react-router-dom';

export function ArticlesById({id}) {

    const [inputValue, setInputValue] = useState("");
    const {responseTextHandler} = useContext(BlogContext);
    const [postsById, setPostsById] = useState([]);
    const [postsByFilter, setPostsByFilter] = useState([]);
    const [loadMoreCounter, setLoadMoreCounter] = useState(3);
    const [isMorePosts, setIsMorePosts] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPostsById([]);
    }, [id]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value.trim());
    };

    const fetchIdPosts = async (clickedLoadMore) => {

        const loadCounter = clickedLoadMore ? (loadMoreCounter + 3) : 3;
        setLoadMoreCounter(loadCounter);

        try {
            const url = `${process.env.REACT_APP_SERVER_ROUTE}/post/profile?id=${id}`;
            if (inputValue === "") {
                const response = await fetch(`${url}&from=${loadCounter-2}&to=${loadCounter+1}`, {headers : {'token': `${JSON.parse(localStorage.getItem("user"))?.token}`}});
                const clonedResponse = response.clone();
                let data;
                try {
                    data = await response.json();
                } catch (error) {
                    data = await clonedResponse.text();
                    const res = responseTextHandler(data);
                    throw new Error;
                }
                
                if (JSON.stringify(data) === JSON.stringify(data.slice(0,3))) {
                    setIsMorePosts(false);
                } else {
                    setIsMorePosts(true);
                }
                setPostsById(prevPosts => [...prevPosts, ...data.slice(0,3)]);
                setPostsByFilter([]);
            } else {
                const response = await fetch(`${url}&filterBy=${inputValue}`, {headers : {'token': `${JSON.parse(localStorage.getItem("user"))?.token}`}});
                const clonedResponse = response.clone();
                let data;
                try {
                    data = await response.json();
                } catch (error) {
                    data = await clonedResponse.text();
                    responseTextHandler(data);
                }
                setPostsByFilter(data);
                setPostsById([]);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchIdPosts();
    }, [id, inputValue]);

    return (
    <div className="subject">
        <div className="filter">
            <label className="search-label">Search: </label>
            <input className="search-input" type="text" placeholder="type seach value" onChange={handleInputChange}/>
        </div>
        
        {inputValue === "" ? postsById.map(post => <ArticleCard singlePost={post} key={post.id} />) : 
        postsByFilter.map(post => <ArticleCard singlePost={post} key={post.id} />)}
        {(isMorePosts && inputValue === "" ) &&
        <div className="more-articles-block">
            <button className="more-articles-button" onClick={() => fetchIdPosts(true)}>Load More</button>
        </div>}
    </div>
    );
}