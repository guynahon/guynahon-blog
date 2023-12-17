import './AdminPage.css'
import {useContext, useState} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {BlogContext} from "../Providers/BlogProvider";

export function Admin() {
    const [inputValue, setInputValue] = useState("");
    const {user} = useContext(AuthContext);
    const {posts, addPost, removePost, clearPosts} = useContext(BlogContext);


    const handleAddPost = (event) => {
        event.preventDefault();

        const {title, body} = event.target.elements;
        addPost({
            title: title.value,
            body: body.value,
            id: posts.length + 1
        });
        title.value = "";
        body.value = "";
    };

    const handleRemoveInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleRemovePost = () => {
        removePost(Number(inputValue));
        setInputValue("");
    };


    return (
        user ?
        <div className="all-admin">
            <h1>Admin Panel</h1>
            <form className="admin-form" onSubmit={handleAddPost}>
                <span className="admin-headers">Add a new post</span>
                <div className="form-title">
                    <label htmlFor="title">Title:</label>
                    <input id="title" name="title" type="text"/>
                </div>
                <div className="form-content">
                    <label htmlFor="body">Content:</label>
                    <input id="body" name="body"/>
                </div>
                <button className="form-btn submit-form" type="submit">Submit</button>
            </form>
            <div className="remove-post">
                <span className="admin-headers">Remove a post by ID</span>
                <input onInput={handleRemoveInput} id="remove-input" type="text" value={inputValue}/>
                {/*onChange works as well !!!*/}
                <button className="form-btn" onClick={handleRemovePost}>Remove post</button>
            </div>
            <button className="form-btn" onClick={clearPosts}>Clear Posts</button>
        </div> : <span className="pls-log-in">Please Log in !</span>
    );
}