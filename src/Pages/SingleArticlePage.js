import {SingleArticle} from "../SingleArticleComponents/SingleArticle";
import {Header} from "../Components/Header";

//this component displays a single article by id
export function SingleArticlePage() {
    return (
        <>
            <Header/>
            <SingleArticle/>
        </>
    );
}