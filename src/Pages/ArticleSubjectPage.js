import {Header} from "../Components/Header";
import {ArticleCardList} from "../SubjectPageComponents/ArticleCardList";
import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";
import {filterPostsBySubject} from "../helper-functions/filterPostsBySubject";


export function ArticleSubjectPage() {
    const location = useLocation().pathname;
    const {posts} = useContext(BlogContext);
    const {subject} = useParams();
    const [subjectPosts, setSubjectPosts] = useState([]);

    useEffect(() => {
        setSubjectPosts(filterPostsBySubject(subject, posts));
    }, [posts, location]);

    return (
        <>
            <Header/>
            <ArticleCardList subjectPosts={subjectPosts}/>
        </>
    );
}