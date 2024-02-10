import { Header } from "../Components/Header";
import { ArticlesById } from "../Components/ArticlesById";
import {useParams} from "react-router-dom";

export const ProfilePage = () => {
    const {id} = useParams();
    return(
        <>
            <Header />
            <ArticlesById id={id} />
        </>
    );


};