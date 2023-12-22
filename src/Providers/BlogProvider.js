import {createContext, useEffect, useState} from "react";

// create BlogContext as context
export const BlogContext = createContext(null);

export function BlogProvider({children}) {

    // posts and a setPosts to change its value - this variable is sent to Components to handle the display
    // of posts in different pages, we initialize its value to an empty array.
    const [posts, setPosts] = useState([]);

    // selectedPost - this variable is being sent via useContext to the adminPage. the value in side this variable
    // is the post we want to edit in the admin panel.
    const [selectedPost, setSelectedPost] = useState(null);

    // this method is responsible for adding a new post to the posts and updating the local storage
    const addPost = (singlePost) => {
        setPosts([...posts, singlePost]);
        localStorage.setItem("posts", JSON.stringify([...posts, singlePost]));
    };

    // this method is responsible for removing a post from posts and updating the local storage.
    const removePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
        localStorage.setItem("posts", JSON.stringify(posts.filter(post => post.id !== postId)));
    };

    // this method is responsible for clearing all the posts from posts and updating the local storage
    const clearPosts = () => {
        setPosts([]);
        localStorage.setItem("posts", []);
    };

    // this method get as input a post from the ArticleCard by pressing an Edit Button, and sets the selectedPost
    // to it. then we use it in Admin Page to edit the post.
    const editPost = (post) => {
        setSelectedPost(post);
    }

    // this method is getting the post to edit and the input data for the posts new values from the handleAddOrEditPost
    // in the admin panel, and updates the posts array and local storage.
    const updatePost = (selectedPost, data) => {
        const newPostsArray = [...posts];
        const index = posts.findIndex(post => post.id === selectedPost.id);
        newPostsArray[index].title = data.title;
        newPostsArray[index].body = data.body;
        newPostsArray[index].date = data.createdAt;
        newPostsArray[index].subject = data.subject;
        setPosts(newPostsArray);
        localStorage.setItem("posts", JSON.stringify(newPostsArray));
    }


    // this useEffect is getting the posts from the local storage and checks if there are posts in it before setting
    // the posts to its value.
    useEffect(() => {
        const postsString = localStorage.getItem("posts");
        if (postsString) {
            setPosts(JSON.parse(postsString));
        }
    }, []);

    // the values to pass to BlogProvider's children (useContext(BlogContext))
    const value = {posts, selectedPost, setSelectedPost, addPost, removePost, clearPosts, editPost, updatePost}
    return (
        <BlogContext.Provider value = {value}>
            {children}
        </BlogContext.Provider>
    );
}