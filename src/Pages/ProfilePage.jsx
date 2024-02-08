import { HomeHeader } from "../Components/HomeHeader";
import { ArticlesById } from "../Components/ArticlesById";
import {useParams} from "react-router-dom";

export const ProfilePage = () => {
    const {id} = useParams();
    return(
        <>
            <HomeHeader />
            <ArticlesById id={id} />
        </>
    );


};