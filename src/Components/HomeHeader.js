import {Header} from "./Header";
import '../Styles/home-header.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export function HomeHeader() {
    const {user} = useContext(AuthContext);
    const [header, setHeader] = useState(null);
    const [paragraph, setParagraph] = useState(null);
    
    useEffect(() => {
        setHeader("Welcome to Guy's blog!");
        setParagraph("The only place you will find happiness!");
    },[user]);

    const props = {header, paragraph}

    return (
        <div className="home-header">
            <div className="home-header-block">
                <div className="home-header-tag">
                    <a className="main-header-button">👋 Meet Personally</a>
                </div>
                <Header props={props}/>
            </div>
        </div>
    );
}