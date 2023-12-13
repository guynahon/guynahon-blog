import './ArticleCard.css'
import {Link} from "react-router-dom";
export function ArticleCard({singlePost}) {
    const id = singlePost.id;
    const route = `/article/${id}`
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth',
        });
    };

    const day = new Date().getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[new Date().getMonth()];
    const year = new Date().getFullYear();

    return (
        <Link to={route} onClick={scrollToTop}>
            <div className="card">
                <div className="card-content-frame">
                    <h5 className="card-date">{day+" "+month+" "+year}</h5>
                    <div className="card-text">
                        <h3 className="card-header">{singlePost.title}</h3>
                        <p className="card-paragraph">{singlePost.body}</p>
                    </div>
                </div>
                <img src="../article-pic2.jpeg" alt="logo"/>
            </div>
        </Link>
    );
}