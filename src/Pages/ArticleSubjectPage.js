import {Header} from "../Components/Header";
import {ArticleCardList} from "../Components/ArticleCardList";
import {useParams} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export function ArticleSubjectPage() {
    const {subject} = useParams();
    const {user} = useContext(AuthContext);
    const [header, setHeader] = useState(null);
    const [paragraph, setParagraph] = useState(null);

    const subjectsHeaders = {
        dailydigest: "Daily Digest",
        designtools: "Design Tools",
        tutorials: "Tutorials"
    };

    const subjectsParagraphs = {
        dailydigest: "A description of the respective category goes right here. Be as expressive as possible, but in brief.",
        designtools: "A description of the respective category goes right here. Be as expressive as possible, but in brief.",
        tutorials: "A description of the respective category goes right here. Be as expressive as possible, but in brief."
    };
    
    useEffect(() => {
        setHeader(subjectsHeaders[subject]);
        setParagraph(subjectsParagraphs[subject]);
    },[user, subject]);

    const props = {header, paragraph}

    return (
        <>
            <Header props={props}/>
            <ArticleCardList subject={subject}/>
        </>
    );
}