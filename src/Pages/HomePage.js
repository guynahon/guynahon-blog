import {HomeHeader} from "../Components/HomeHeader"
import {ArticlesBySubjects} from "../Components/ArticlesBySubjects";

export function HomePage() {
    // these components build the HomePage component
    return (
        <>
            <HomeHeader/>
            <ArticlesBySubjects/>
        </>
    );
}