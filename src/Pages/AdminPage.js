import './AdminPage.css'
import {useContext, useEffect} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import {BlogContext} from "../Providers/BlogProvider";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export function Admin() {


    // getting the user in order to confirm log in (to use the admin panel)
    const {user, isAdmin} = useContext(AuthContext);

    // getting the needed methods and states that we'll use in the panel
    const {removePost, addPost, clearPosts, selectedPost, setSelectedPost, updatePost} = useContext(BlogContext);

    // from the react-hook-form library importing the methods we will use
    const {register, handleSubmit, formState, watch} = useForm();

    // from react-router setting navigate to useNavigate(), with this variable we can navigate by command.
    const navigate = useNavigate();

    // dateWatcher - watching the createdAt input (type: date) meaning we can track its value
    const dateWatcher = watch("createdAt");

    // day, month and year - getting the current ones according to today's date.
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


    // when we submit a form this function is called in order to handle our submit, if selectedPost null (add mode)
    // we add a new post. if selectedPost is not null we edit the selectedPost (edit mode).
    const handleAddOrEditPost = (data, event) => {
        if (selectedPost) {
            // this function handles the update of the posts array after editing a post
            updatePost(selectedPost, data);
            // reset all the input fields
            event.target.reset();
            // setting selectedPost back to null because we finished editing (returning admin panel to add mode)
            setSelectedPost(null);
            // navigating automatically to the subject the post was added to.
            navigate(`/subjects/${data.subject}`);
        } else {
            // calling addPost to add a new post
            addPost({
                title: data.title,
                body: data.body,
                subject: data.subject,
                date: data.createdAt,
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
                {/*onsubmit calling the handleSubmit function from react-hook-form and passing it the
                handleAddOrEditPost function, the react-form function allows as to get the data from
                 the inputs as an argument*/}
                <form className="admin-form" onSubmit={handleSubmit(handleAddOrEditPost)}>
                    {/*this helps the user know if he's in add or edit mode*/}
                    <span className="admin-headers">{selectedPost ? "Edit" : "Add"} a post</span>

                    <div className="form-title">
                        <label htmlFor="title">Title:</label>
                        {/* title text area - we pass the ...register the restrictions we want on that textarea named -
                        title. we require a title to each post, between 5-100 characters that only allows english
                        letters, numbers and punctuations and display the relevant messages.
                        additionally we check if selectedPost is null, if not it means we are in edit-mode, and
                        we will automatically fill the title*/}
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

                    {/* content text area - we pass the ...register the restrictions we want on that textarea named -
                    content. we require a content to each post, minimum of 5 characters.
                    additionally we check if selectedPost is null, if not it means we are in edit-mode, and
                    we will automatically fill the content*/}
                    <div className="form-content">
                        <label htmlFor="body">Content:</label>
                        <textarea {...register("body", {
                            required: true,
                            minLength: 5})} defaultValue={selectedPost ? selectedPost.body : ""}/>
                        {formState.errors.body?.type === "required" && <span className="error-msg">a body is required!</span>}
                        {formState.errors.body?.type === "minLength" && <span className="error-msg">minimum 5 characters</span>}
                    </div>

                    {/* date input - we pass the ...register the restrictions we want on that input named -
                    title. we require a date to each post, and that the date will be today's date or higher.
                    additionally we check if selectedPost is null, if not it means we are in edit-mode, and
                    we will automatically fill the date*/}
                    <div className="form-date">
                        <label htmlFor="date">Date:</label>
                        <input type="date" {...register("createdAt", {
                            required: true
                        })} defaultValue={selectedPost ? selectedPost.date : ""} />
                        {(new Date(dateWatcher) < new Date(year, month, day)) && (<span className="error-msg">Date is invalid!</span>)}
                    </div>

                    {/* subject select - we pass the ...register the restrictions we want on that select named -
                    subject. we require a subject to each post.
                    additionally we check if selectedPost is null, if not it means we are in edit-mode, and
                    we will automatically fill the subject*/}
                    <div className="form-subject">
                        <label htmlFor="subject">Article Subject:</label>
                        <select {...register("subject")} defaultValue={selectedPost ? selectedPost.subject : ""}>
                            <option value="dailydigest">Daily Digest</option>
                            <option value="designtools">Design Tools</option>
                            <option value="tutorials">Tutorials</option>
                        </select>
                    </div>

                    {/*a submit button, if selectedPost is null (add-mode) its says Add else Save (edit-mode)*/}
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