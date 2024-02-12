import { Header } from "../Components/Header";
import { ArticlesById } from "../Components/ArticlesById";
import {useParams} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const ProfilePage = () => {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [header, setHeader] = useState(null);
    const [paragraph, setParagraph] = useState(null);
    
    useEffect(() => {
        setHeader(`${user?.firstName} ${user?.lastName}'s alltime posts!`);
        setParagraph(null);
    },[user]);

    const props = {header, paragraph}

    return(
        <>
            <Header props={props}/>
            <ArticlesById id={id} />
        </>
    );


};