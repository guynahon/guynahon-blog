import './ArticleCard.css'
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {BlogContext} from "../Providers/BlogProvider";
import {AuthContext} from "../Providers/AuthProvider";

export function ArticleCard({singlePost}) {
    const id = singlePost.id;
    const route = `/article/${id}`;
    const {removePost, editPost} = useContext(BlogContext);
    const {user} = useContext(AuthContext);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };

    const currentDate = singlePost.date.split("-");
    const day = currentDate[2];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[Number(currentDate[1]-1)];
    const year = currentDate[0];

    const handlePostEdit = () => {
        editPost(singlePost);
    }

    const handlePostEditClick = () => {
        handlePostEdit();
        scrollToTop();
    };

    return (
            <div className="card">
                <div className="card-content-frame">
                    <h5 className="card-date">{day+" "+month+" "+year}</h5>
                    <div className="card-text">
                        <h3 className="card-header">{singlePost.title}</h3>
                        <p className="card-paragraph">{singlePost.body}</p>
                    </div>
                    <div className="card-footer">
                        <div className="read-more" onClick={scrollToTop}><NavLink to={route}>Read More</NavLink></div>
                        {user && (
                            <>
                                <div className="card-edit-btn">
                                    <NavLink to="/admin" onClick={handlePostEditClick}>Edit Post</NavLink>
                                </div>
                                <div className="card-remove-btn">
                                    <button onClick={() => removePost(id)}>X</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <img src={`https://picsum.photos/300/300?${singlePost.id}`} alt="random-picture"/>
            </div>
    );
}