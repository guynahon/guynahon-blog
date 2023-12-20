import {HomeHeader} from "../HomePageComponenets/HomeHeader";
import {ArticlesBySubjects} from "../CardComponents/ArticlesBySubjects";

export function HomePage() {
    // these components build the HomePage component
    return (
        <>
            <HomeHeader/>
            <ArticlesBySubjects/>
        </>
    );
}