import {createContext, useState} from "react";

// create BlogContext as context
export const BlogContext = createContext(null);

export function BlogProvider({children}) {

    const [selectedPost, setSelectedPost] = useState(null);


    const addPost = async (singlePost) => {
        try {
            const newPost = {
                "title": singlePost.title,
                "body": singlePost.body,
                "subject": singlePost.subject,
                "date": singlePost.date
            }

            await fetch(`http://localhost:5000/post/`, {
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
            await fetch(`http://localhost:5000/post/${postId}/`, {method: 'DELETE'});
        } catch(error) {
            console.log(`error removing post number ${postId} : (${error})`);
        }
    };




    const clearPosts = async () => {
        try {
            await fetch("http://localhost:5000/post/clear/", {method: 'DELETE'});
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
                "date": data.createdAt
            }

            const response = await fetch(`http://localhost:5000/post/${selectedPost.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToUpdate)
            });
            
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