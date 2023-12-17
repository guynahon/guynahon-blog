import {createContext, useEffect, useState} from "react";

export const BlogContext = createContext(null);

export function BlogProvider({children}) {
    const [posts, setPosts] = useState([]);

 useEffect(() => {
     fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
         .then(json => setPosts(json));
 }, []);

 const addPost = (singlePost) => {
     setPosts([...posts, singlePost]);
 };

 const removePost = (postId) => {
     const index = posts.findIndex(post => postId === post.id);
     console.log(index)
     if (index !== -1) {
         posts.splice(index, 1)
         setPosts(posts);
     }
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