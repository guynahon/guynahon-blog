import {Header} from "../Components/Header";
import {ArticleCardList} from "../Components/ArticleCardList";
import {useParams} from "react-router-dom";

// this component helps us display the posts by subject
export function ArticleSubjectPage() {

    // subject from the route parameters (dynamic routes)
    const {subject} = useParams();


    return (
        <>
            <Header/>
            <ArticleCardList subject={subject}/>
        </>
    );
}