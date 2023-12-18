import {createContext, useEffect, useState} from "react";

export const BlogContext = createContext(null);

export function BlogProvider({children}) {
    const [posts, setPosts] = useState([]);

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


 const value = {posts, addPost, removePost, clearPosts}
 return (
     <BlogContext.Provider value = {value}>
         {children}
     </BlogContext.Provider>

 );
}