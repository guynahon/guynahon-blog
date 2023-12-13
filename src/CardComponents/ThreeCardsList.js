import {ArticleCard} from "./ArticleCard";

export function ThreeCardsList({posts}) {
    const threePosts = posts.slice(0, 3);
    return (
        <>
            {threePosts.map((post) => <ArticleCard singlePost={post} />)}
        </>
    );
}