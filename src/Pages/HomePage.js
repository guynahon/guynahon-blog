import {HomeHeader} from "../Components/HomeHeader"
import {ThreeCardsList} from "../Components/ThreeCardsList";
import '../Styles/home-page.css'

export function HomePage() {
    return (
        <>
            <HomeHeader/>
            <div className="articles">
                <ThreeCardsList subject={"dailydigest"} />
                <ThreeCardsList subject={"designtools"}/>
                <ThreeCardsList subject={"tutorials"}/>
            </div>
        </>
    );
}