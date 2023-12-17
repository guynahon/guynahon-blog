import {ThreeCardsSection} from "./ThreeCardsSection";
import './Articles-divided-to-subjects-component.css'
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/BlogProvider";

export function ArticlesDividedToSubjectsComponent() {

    return (
        <div id="articles">
            <ThreeCardsSection />
            <ThreeCardsSection />
            <ThreeCardsSection />
        </div>
    );
}