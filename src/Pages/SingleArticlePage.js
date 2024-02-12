import {SingleArticle} from "../Components/SingleArticle";
import {Header} from "../Components/Header";
import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

export function SingleArticlePage() {

    const [singlePost, setSinglePost] = useState(null);
    const {user} = useContext(AuthContext);
    const [header, setHeader] = useState(null);
    const [paragraph, setParagraph] = useState(null);
    
    useEffect(() => {
        setHeader(singlePost?.title);
        setParagraph(null);
    },[user, singlePost]);

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

    const props = {header, paragraph}

    return (
        <>
            <Header props={props}/>
            <SingleArticle singlePost={singlePost}/>
        </>
    );
}