import {createContext, useEffect, useState} from "react";

export const BlogContext = createContext(null);

export function BlogProvider({children}) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPosts] = useState(null);

 // useEffect(() => {
 //     fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
 //         .then(json => setPosts(json));
 // }, []);

 const addPost = (singlePost) => {
     setPosts([...posts, singlePost]);
 };

const removePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
};

 const clearPosts = () => {
     setPosts([]);
 };

 const editPost = (post) => {
     setSelectedPost(post);
 }


 const value = {posts, selectedPost, addPost, removePost, clearPosts, editPost}
 return (
     <BlogContext.Provider value = {value}>
         {children}
     </BlogContext.Provider>

 );
}