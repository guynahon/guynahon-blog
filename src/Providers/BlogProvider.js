import {createContext, useEffect, useState} from "react";

export const BlogContext = createContext(null);

export function BlogProvider({children}) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    const addPost = (singlePost) => {
        setPosts([...posts, singlePost]);
        localStorage.setItem("posts", JSON.stringify([...posts, singlePost]));
    };

    const removePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
        localStorage.setItem("posts", JSON.stringify(posts.filter(post => post.id !== postId)));
    };

    const clearPosts = () => {
        setPosts([]);
        localStorage.setItem("posts", []);
    };

    const editPost = (post) => {
        setSelectedPost(post);
    }

    const updatePost = (selectedPost, data) => { //after edit
        const arr = [...posts];
        const i = posts.findIndex(post => post.id === selectedPost.id);
        arr[i].title = data.title;
        arr[i].body = data.body;
        arr[i].date = data.createdAt;
        setPosts(arr);
        localStorage.setItem("posts", JSON.stringify(arr));
    }

    useEffect(() => {
        const postsString = localStorage.getItem("posts"); // checking if the local storage is null before settingPosts
        if (postsString) {
            setPosts(JSON.parse(postsString));
        }
    }, []);


    const value = {posts, selectedPost, setSelectedPost, addPost, removePost, clearPosts, editPost, updatePost}
    return (
        <BlogContext.Provider value = {value}>
            {children}
        </BlogContext.Provider>
    );
}