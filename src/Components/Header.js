import './Header.css'
import {useLocation, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";
import {DarkContext} from "../Providers/DarkProvider";

// this component provides a number of pages with a dynamic header based on their route
export function Header () {
    // posts array from the BlogContext
    const {posts} = useContext(BlogContext);
    const {isDarkMode} = useContext(DarkContext);

    // header and paragraph dynamic variables
    const [pageHeader, setPageHeader] = useState(null);
    const [pageParagraph, setPageParagraph] = useState(null);

    // id from the route parameters (dynamic routes)
    const {id} = useParams();

    // we use useLocation.pathname to get a string with the route we are currently in
    const location = useLocation().pathname;


    // use Effect helps with executing the switch statement every time the location or posts change
    // we need to track the location in order to know where we currently are and based on that information
    // update the header, and we need to track posts because we are getting the posts from the local storage
    // and because of the delay we will get an empty array in the first second so if we don't
    // track it won't have a header in the dynamic routes after refresh
    useEffect(() => {
        switch (location) {
            case "/":
                setPageHeader("Welcome to Guy's blog!");
                setPageParagraph("The only place you will find happiness!");
                break;

            case "/subjects/dailydigest":
                setPageHeader("Daily Digest");
                setPageParagraph("A description of the respective category goes right here." +
                    " Be as expressive as possible, but in brief.");
                break;

            case "/subjects/designtools":
                setPageHeader("Design Tools");
                setPageParagraph("A description of the respective category goes right here. " +
                    "Be as expressive as possible, but in brief.");
                break;

            case "/subjects/tutorials":
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
        <div className={`main-header ${isDarkMode ? "dark" : ""}`}>
            <div className={`page-header ${isDarkMode ? "dark" : ""}`}>{pageHeader}</div>
            {pageParagraph && <p className={`page-paragraph ${isDarkMode ? "dark" : ""}`}>{pageParagraph}</p>}
        </div>
    );
}