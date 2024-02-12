import '../Styles/admin-page.css'
import {useContext, useEffect} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {BlogContext} from "../Providers/BlogProvider";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export function Admin() {

    const {user, isAdmin} = useContext(AuthContext);
    const {removePost, addPost, clearPosts, selectedPost, setSelectedPost, updatePost} = useContext(BlogContext);
    const {register, handleSubmit, formState, watch} = useForm();
    const navigate = useNavigate();
    const dateWatcher = watch("createdAt");
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    // ** Attention - this useEffect won't work with React.StrictMode On **
    // when unmounting the Admin component, setting the selectedPost to null, we do this because when we are
    // in edit mode, and we leave in the middle (pressing another Link in the navigation for example),
    // when we will return to admin panel we will be in add mode again.
    useEffect(() => {
        return () => {
            setSelectedPost(null)
        }
    }, [selectedPost]);

    // checking if the user is logged in, if not, we return this message tag
    if (!isAdmin) {
        return (<div className="pls-log-in-back"><span className="pls-log-in">You are not an Admin !</span></div>);
    }

    const handleAddOrEditPost = async (data, event) => {
        if (selectedPost) {
            await updatePost(selectedPost, data);
            event.target.reset();
            setSelectedPost(null);
            navigate(`/subjects/${data.subject}`);
        } else {
            addPost({
                title: data.title,
                body: data.body,
                subject: data.subject,
                date: data.createdAt,
                image_url: data.image,
                posted_by: user?.id
            });
            // reset all input fields
            event.target.reset();
        }
    };

    const handleRemovePost = (id, subject) => {
        removePost(id);
        navigate(`/subjects/${subject}`);
    };

    return (
        <div className="admin">
            <div className="all-admin">

                <form className="admin-form" onSubmit={handleSubmit(handleAddOrEditPost)}>
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

                    <div className="form-image">
                        <label htmlFor="image">Image URL:</label>
                        <input {...register("image", {
                            required: true,
                            pattern : /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*\.(jpg|jpeg|gif|png|webp|svg))/   
                        })} type="text" defaultValue={selectedPost ? selectedPost.image_url : ""}/>
                        {formState.errors.image?.type === "required" && <span className="error-msg">an image is required!</span>}
                        {formState.errors.image?.type === "pattern" && <span className="error-msg">not a valid image url!</span>}
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

                    <button className="form-btn submit-form" type="submit">{selectedPost ? "Save" : "Add"}</button>

                </form>
                {/*if we are in add-mode we can see that clear posts (default admin panel)
                if we are in edit mode clearPosts is hidden*/}
                {selectedPost && <button className="form-btn" onClick={() => handleRemovePost(selectedPost.id, selectedPost.subject)}>Remove Post</button>}
                {!selectedPost && <button className="form-btn" onClick={clearPosts}>Clear Posts</button>}
            </div>
        </div>
    );
}