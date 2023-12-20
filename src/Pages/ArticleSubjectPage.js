import {Header} from "../Components/Header";
import {ArticleCardList} from "../SubjectPageComponents/ArticleCardList";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";
import {filterPostsBySubject} from "../helper-functions/filterPostsBySubject";

// this component helps us display the posts by subject
export function ArticleSubjectPage() {

    // posts array from the BlogContext
    const {posts} = useContext(BlogContext);

    // subject from the route parameters (dynamic routes)
    const {subject} = useParams();

    // useState the helps us to dynamically set the wanted subject posts to it
    const [postsBySubject, setPostsBySubject] = useState([]);

    // use Effect helps with executing the filterPostsBySubject function and setting the value we got to the
    // postsBySubject useState every time the subject or posts change.
    // we need to track the subject in order to know in what subject we are currently at, and based on that information
    // update the articles. we need to track posts because we are getting the posts from the local storage
    // and because of the delay we can get an empty array in the first second and don't get the content in those
    // dynamic routes.
    useEffect(() => {
        setPostsBySubject(filterPostsBySubject(subject, posts));
    }, [posts, subject]);

    return (
        <>
            <Header/>
            <ArticleCardList postsBySubject={postsBySubject}/>
        </>
    );
}