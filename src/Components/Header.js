import './Header.css'
import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";
export function Header () {
    const {posts} = useContext(BlogContext);
    const [pageHeader, setPageHeader] = useState(null);
    const [pageParagraph, setPageParagraph] = useState(null);
    const {id} = useParams();

    console.log(posts);
    const location = useLocation().pathname;

    useEffect(() => {
        switch (location) {
            case "/":
                setPageHeader("Welcome to Guy's blog!");
                setPageParagraph("The only place you will find happiness!");
                break;

            case "/subject":
                setPageHeader("topic 123");
                setPageParagraph("a very nice paragraph!");
                break;

            case `/subject/${id}`:
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