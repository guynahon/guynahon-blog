import {ArticleCard} from "./ArticleCard";

export function ArticleCardsList({posts}) {
    return (
        <>
            {posts.map((post) => <ArticleCard singlePost={post} />)}
        </>
    );
}