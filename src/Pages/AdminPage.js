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
        })
    };

    const handleRemoveInput = (event) => {
        setInputValue(event.target.value);
    }


    return (
        user ?
        <div className="all-admin">
            <form className="admin-form" onSubmit={handleAddPost}>
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
            <button className="form-btn" onClick={clearPosts}>Clear Posts</button>
            <div className="remove-post">
                <input onInput={handleRemoveInput} id="remove-input" type="text"/>
                {/*onChange works as well !!!*/}
                <button className="form-btn" onClick={() => removePost(Number(inputValue))}>Remove post</button>
            </div>
        </div> : <span className="pls-log-in">Please Log in !</span>
    );
}