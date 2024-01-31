import {SingleArticle} from "../SingleArticleComponents/SingleArticle";
import {Header} from "../Components/Header";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

//this component displays a single article by id
export function SingleArticlePage() {

    const [singlePost, setSinglePost] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_ROUTE}/post/${id}`);
                const jsonData = await response.json();
                setSinglePost(jsonData);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    return (
        <>
            <Header singlePost={singlePost}/>
            <SingleArticle singlePost={singlePost}/>
        </>
    );
}