import {createContext, useCallback, useContext, useState} from "react";
import { AuthContext } from "./AuthProvider";

// create BlogContext as context
export const BlogContext = createContext(null);

export function BlogProvider({children}) {

    const [selectedPost, setSelectedPost] = useState(null);
    const {logOut} = useContext(AuthContext);


    const addPost = async (singlePost) => {
        try {
            const newPost = {
                "title": singlePost.title,
                "body": singlePost.body,
                "subject": singlePost.subject,
                "date": singlePost.date,
                "posted_by": singlePost.posted_by
            }

            await fetch(`${process.env.REACT_APP_SERVER_ROUTE}/post/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });
        } catch (error) {
            console.error("error in adding post", error);
        }

    };




    const removePost = async (postId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ROUTE}/post/${postId}/`, {
                method: 'DELETE',
                headers: {
                    'token': `${JSON.parse(localStorage.getItem("user")).token}`
                }
            });
            const responseText = await response.text();
            if (responseText === 'Unauthorized') {
                alert('session expried, you are being logged out');
                logOut();
            }
        } catch(error) {
            console.log(`error removing post number ${postId} : (${error})`);
        }
    };




    const clearPosts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_ROUTE}/post/clear/`, {
                method: 'DELETE',
                headers: {
                    'token': `${JSON.parse(localStorage.getItem("user")).token}`
                }
            });
            const responseText = await response.text();
            if (responseText === 'Unauthorized') {
                alert('session expried, you are being logged out');
                logOut();
            }
        } catch(error) {
                console.log("error clearing all posts from DB");
        }
    };




    const editPost = (post) => {
        setSelectedPost(post);
    }

    const updatePost = async (selectedPost, data) => {
        try {
            const dataToUpdate = {
                "title": data.title,
                "body": data.body,
                "subject": data.subject,
                "date": data.createdAt,
                "posted_by": data.posted_by
            }
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_ROUTE}/post/${selectedPost.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${JSON.parse(localStorage.getItem("user")).token}`
                },
                body: JSON.stringify(dataToUpdate)
            });
            const responseText = await response.text();
            if (responseText === 'Unauthorized') {
                alert('session expried, you are being logged out');
                logOut();
            } 
        } catch (error) {
            console.error("error in editing", error);
        }
        
    }

    // the values to pass to BlogProvider's children (useContext(BlogContext))
    const value = {selectedPost, setSelectedPost, addPost, removePost, clearPosts, editPost, updatePost};
    return (
        <BlogContext.Provider value = {value}>
            {children}
        </BlogContext.Provider>
    );
}