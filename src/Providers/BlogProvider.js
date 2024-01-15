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



    const addPost = async (singlePost) => {
        try {
            const newPost = {
                "title": singlePost.title,
                "body": singlePost.body,
                "subject": singlePost.subject,
                "date": singlePost.date
            }

            const response = await fetch(`http://localhost:5000/post/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                setPosts([...posts, singlePost]);
            } else {
                console.error("Error in adding post");
            }

        } catch (error) {
            console.error("error in adding post", error);
        }

    };


    const removePost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5000/post/${postId}/`, {method: 'DELETE'});
            if (response.ok) {
                setPosts(posts.filter(post => post.id !== postId));
            } else {
                console.log(`error removing post number ${postId}`);
            }
        } catch(error) {
            console.log(`error removing post number ${postId} : (${error})`);
        }
    };

    // this method is responsible for clearing all the posts from posts and updating the local storage
    const clearPosts = async () => {
        try {
            const response = await fetch("http://localhost:5000/post/clear/", {method: 'DELETE'});
            if (response.ok) {
                setPosts([]);
            } else {
                console.log("error clearing all posts");
            }
        } catch(error) {
                console.log("error clearing all posts from DB");
        }
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/post');
                const jsonData = await response.json();
                setPosts(jsonData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []);

    // the values to pass to BlogProvider's children (useContext(BlogContext))
    const value = {posts, selectedPost, setSelectedPost, addPost, removePost, clearPosts, editPost, updatePost}
    return (
        <BlogContext.Provider value = {value}>
            {children}
        </BlogContext.Provider>
    );
}