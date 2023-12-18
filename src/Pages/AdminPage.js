import './AdminPage.css'
import {useContext, useState} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {BlogContext} from "../Providers/BlogProvider";
import {useForm} from "react-hook-form";

export function Admin() {
    const {user} = useContext(AuthContext);
    const {posts, addPost, clearPosts} = useContext(BlogContext);
    const {register, handleSubmit, formState, watch} = useForm();
    const dateWatcher = watch("createdAt");

    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();


    const handleAddPost = (data, event) => {
        addPost({
            title: data.title,
            body: data.body,
            id: posts.length + 1,
            date: data.createdAt
        });
        event.target.reset();
    };


    return (
        user ?
        <div className="all-admin">
            <h1>Admin Panel</h1>
            <form className="admin-form" onSubmit={handleSubmit(handleAddPost)}>
                <span className="admin-headers">Add a new post</span>

                <div className="form-title">
                    <label htmlFor="title">Title:</label>
                    <input type="text" {...register("title", {
                        required: true,
                        pattern: /[A-Za-z\d.,!?;:'"\s\t-]/,
                        minLength: 5})} />
                    {formState.errors.title?.type === "required" && <span className="error-msg">Title is required</span>}
                    {formState.errors.title?.type === "pattern" && <span className="error-msg">must contain only english letters!</span>}
                    {formState.errors.title?.type === "minLength" && <span className="error-msg">minimum 5 characters</span>}
                </div>

                <div className="form-content">
                    <label htmlFor="body">Content:</label>
                    <input type="text" {...register("body", {
                        required: true,
                        minLength: 5})}/>
                    {formState.errors.body?.type === "required" && <span className="error-msg">a body is required!</span>}
                    {formState.errors.body?.type === "minLength" && <span className="error-msg">minimum 5 characters</span>}
                </div>

                <div className="form-date">
                    <label htmlFor="date">Date:</label>
                    <input type="date" {...register("createdAt", {
                        required: true
                    })} />
                    {(new Date(dateWatcher) < new Date(year, month, day)) && (<span className="error-msg">Date is invalid!</span>)}
                </div>

                <button className="form-btn submit-form" type="submit">Submit</button>
            </form>
            <button className="form-btn" onClick={clearPosts}>Clear Posts</button>
        </div> : <span className="pls-log-in">Please Log in !</span>
    );
}