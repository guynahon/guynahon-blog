import {ArticleCard} from "../CardComponents/ArticleCard";

export function Acl({posts}) {
    return (
        <>
            {posts.map((post) => <ArticleCard singlePost={post} />)}
        </>
    );
}