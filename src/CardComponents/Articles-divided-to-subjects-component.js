import {ThreeCardsSection} from "./ThreeCardsSection";
import './Articles-divided-to-subjects-component.css'
import {useEffect, useState} from "react";

export function ArticlesDividedToSubjectsComponent() {
    const[posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())
            .then(json => setPosts(json));
    }, []);

    return (
        <div id="articles">
            <ThreeCardsSection posts={posts}/>
            <ThreeCardsSection posts={posts}/>
            <ThreeCardsSection posts={posts}/>
        </div>
    );
}