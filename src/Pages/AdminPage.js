import './AdminPage.css'
import {useContext, useEffect} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {BlogContext} from "../Providers/BlogProvider";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export function Admin() {
    const {user} = useContext(AuthContext);
    const {addPost, clearPosts, selectedPost, setSelectedPost, updatePost} = useContext(BlogContext);
    const {register, handleSubmit, formState, watch} = useForm();
    const navigate = useNavigate();

    const dateWatcher = watch("createdAt");
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    useEffect(() => {
        return () => {
            setSelectedPost(null)
        }
    }, [selectedPost]);

    const handleAddPost = (data, event) => {
        if (selectedPost) {
            updatePost(selectedPost, data);
            event.target.reset();
            setSelectedPost(null);
            navigate(`/subjects/${data.subject}`);
        } else {
            addPost({
                title: data.title,
                body: data.body,
                id: Date.now(),
                date: data.createdAt,
                subject: data.subject
            });
            event.target.reset();
        }
    };

    return (
        user ?
        <div className="all-admin">
            <form className="admin-form" onSubmit={handleSubmit(handleAddPost)}>
                <span className="admin-headers">{selectedPost ? "Edit" : "Add"} a post</span>

                <div className="form-title">
                    <label htmlFor="title">Title:</label>
                    <textarea {...register("title", {
                        required: true,
                        pattern: /[A-Za-z\d.,!?;:'"\s\t-]/,
                        minLength: 5,
                        maxLength: 100})} defaultValue={selectedPost ? selectedPost.title : ""}/>
                    {formState.errors.title?.type === "required" && <span className="error-msg">Title is required</span>}
                    {formState.errors.title?.type === "pattern" && <span className="error-msg">must contain only english letters!</span>}
                    {formState.errors.title?.type === "minLength" && <span className="error-msg">minimum 5 characters</span>}
                    {formState.errors.title?.type === "maxLength" && <span className="error-msg">maximum 100 characters</span>}
                </div>

                <div className="form-content">
                    <label htmlFor="body">Content:</label>
                    <textarea {...register("body", {
                        required: true,
                        minLength: 5})} defaultValue={selectedPost ? selectedPost.body : ""}/>
                    {formState.errors.body?.type === "required" && <span className="error-msg">a body is required!</span>}
                    {formState.errors.body?.type === "minLength" && <span className="error-msg">minimum 5 characters</span>}
                </div>

                <div className="form-date">
                    <label htmlFor="date">Date:</label>
                    <input type="date" {...register("createdAt", {
                        required: true
                    })} defaultValue={selectedPost ? selectedPost.date : ""} />
                    {(new Date(dateWatcher) < new Date(year, month, day)) && (<span className="error-msg">Date is invalid!</span>)}
                </div>

                <div className="form-subject">
                    <label htmlFor="subject">Article Subject:</label>
                    <select {...register("subject")} defaultValue={selectedPost ? selectedPost.subject : ""}>
                        <option value="dailydigest">Daily Digest</option>
                        <option value="designtools">Design Tools</option>
                        <option value="tutorials">Tutorials</option>
                    </select>
                </div>

                <button className="form-btn submit-form" type="submit">{selectedPost ? "Edit" : "Add"}</button>

            </form>
            {!selectedPost && <button className="form-btn" onClick={clearPosts}>Clear Posts</button>}
        </div> : <span className="pls-log-in">Please Log in !</span>
    );
}