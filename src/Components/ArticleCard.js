import '../Styles/article-card.css'
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {BlogContext} from "../Providers/BlogProvider";
import {AuthContext} from "../Providers/AuthProvider";
import {scrollToTop} from "../helper-functions/scrollToTop";


// gets a singlePost param from its father component and displays that posts as a card in the ui
export function ArticleCard({singlePost}) {

    const id = singlePost.id;
    const route = `/article/${id}`;
    const {editPost} = useContext(BlogContext);
    const {isAdmin} = useContext(AuthContext);

    // parsing the date in the way we want to display it
    const currentDate = singlePost.date.split("-");
    const day = currentDate[2];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[Number(currentDate[1]-1)];
    const year = currentDate[0];
    const cardDate = `${day} ${month} ${year}`;

    const handlePostEdit = () => {
        editPost(singlePost);
    }

    const handlePostEditClick = () => {
        handlePostEdit();
        scrollToTop();
    };

    return (
        <div className={"card"}>
            <div className="card-content-frame">
                <h5 className={"card-date"}>{cardDate}</h5>
                <div className="card-text">
                    <h3 className={"card-header"}>{singlePost.title}</h3>
                    <p className={"card-paragraph"}>{singlePost.body}</p>
                </div>
                <div className="card-footer">
                    <div className={"read-more"} onClick={scrollToTop}><NavLink to={route}>Read More</NavLink></div>
                    {/*displays the edit only if user logged in*/}
                    {isAdmin && (
                        <div className="admin-btns">
                            <div className={"card-edit-btn"}>
                                <NavLink to="/admin" onClick={handlePostEditClick}>Edit Post</NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/*an image tag with a src that is api that displays random images*/}
            <div className="img-div">
                <img src={singlePost.image_url} alt={"picture "+id}/>
            </div>

        </div>
    );
}