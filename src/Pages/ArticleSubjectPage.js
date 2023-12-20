import {Header} from "../Components/Header";
import {SubjectComponent} from "../SubjectPageComponents/Subject-component";
import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";

export function ArticleSubjectPage() {
    const location = useLocation().pathname;
    const {posts} = useContext(BlogContext);
    const [subjectPosts, setSubjectPosts] = useState([]);

    useEffect(() => {
        switch (location) {
            case "/dailydigest":
                const dailyDigestPosts = posts.filter(post => post.subject === "dailydigest")
                if (dailyDigestPosts) {
                    setSubjectPosts(dailyDigestPosts)
                }
                break;

            case "/designtools":
                const designToolsPosts = posts.filter(post => post.subject === "designtools")
                if (designToolsPosts) {
                    setSubjectPosts(designToolsPosts)
                }
                break;

            case "/tutorials":
                const tutorialsPosts = posts.filter(post => post.subject === "tutorials")
                if (tutorialsPosts) {
                    setSubjectPosts(tutorialsPosts)
                }
                break;
        }
    }, [location, posts]);

    return (
        <>
            <Header/>
            <SubjectComponent subjectPosts={subjectPosts}/>
        </>
    );
}