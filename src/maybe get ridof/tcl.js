import {ArticleCard} from "../CardComponents/ArticleCard";
import {useContext} from "react";
import {BlogContext} from "../Providers/BlogProvider";

export function Tcl() {
    const {posts} = useContext(BlogContext);
    const threePosts = posts.slice(0, 3);
    return (
        <>
            {threePosts.map((post) => <ArticleCard singlePost={post} />)}
        </>
    );
}