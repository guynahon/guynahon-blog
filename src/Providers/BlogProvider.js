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

            if (response.ok) {
                const updatedPosts = posts.map (post => post.id === selectedPost.id && { ...post, ...dataToUpdate });
                setPosts(updatedPosts);
            } else {
                console.error("Error in editing");
            }

        } catch (error) {
            console.error("error in editing", error);
        }
        
    }


    // this useEffect is getting the posts from the local storage and checks if there are posts in it before setting
    // the posts to its value.
    useEffect(async () => {
        try {
        const fetchData = await fetch('http://localhost:5000/post');
        const jsonData = await fetchData.json();
        setPosts(jsonData);
        } catch (error) {
            console.error('Error fetching posts:', error);
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