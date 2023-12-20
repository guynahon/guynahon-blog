import './Header.css'
import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";
export function Header () {
    const {posts} = useContext(BlogContext);
    const [pageHeader, setPageHeader] = useState(null);
    const [pageParagraph, setPageParagraph] = useState(null);
    const {id, subject} = useParams();

    console.log(subject);
    const location = useLocation().pathname;

    useEffect(() => {
        switch (location) {
            case "/":
                setPageHeader("Welcome to Guy's blog!");
                setPageParagraph("The only place you will find happiness!");
                break;

            case "/dailydigest":
                setPageHeader("Daily Digest");
                setPageParagraph("A description of the respective category goes right here." +
                    " Be as expressive as possible, but in brief.");
                break;

            case "/designtools":
                setPageHeader("Design Tools");
                setPageParagraph("A description of the respective category goes right here. " +
                    "Be as expressive as possible, but in brief.");
                break;

            case "/tutorials":
                setPageHeader("Tutorials");
                setPageParagraph("A description of the respective category goes right here. " +
                    "Be as expressive as possible, but in brief.");
                break;

            case `/article/${id}`:
                const post = posts.find(p => p.id === Number(id));
                if (post) {
                    setPageHeader(post.title);
                    setPageParagraph(null);
                }
                break;
        }
    }, [location, posts]);

    return (
        <div className="main-header">
            <div className="page-header">{pageHeader}</div>
            {pageParagraph && <p className="page-paragraph">{pageParagraph}</p>}
        </div>
    );
}