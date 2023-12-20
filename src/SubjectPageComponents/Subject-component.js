import './Subject-component.css'
import {useState} from "react";
import {ArticleCardsList} from "../CardComponents/ArticleCardsList";


export function SubjectComponent({subjectPosts}) {
    // const {posts} = useContext(BlogContext);
    const [inputValue, setInputValue] = useState("");
    console.log(subjectPosts);


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
        <ArticleCardsList posts={filterPosts(inputValue)} />
        <div className="more-articles-block">
            <a className="more-articles-button">View all</a>
        </div>
    </div>
    );
}