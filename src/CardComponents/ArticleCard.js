import './ArticleCard.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {BlogContext} from "../Providers/BlogProvider";
import {AuthContext} from "../Providers/AuthProvider";
export function ArticleCard({singlePost}) {
    const id = singlePost.id;
    const route = `/article/${id}`;
    const {removePost, editPost, selectedPost} = useContext(BlogContext);
    const {user} = useContext(AuthContext);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            // behavior: 'smooth',
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
                        <div className="read-more" onClick={scrollToTop}><Link to={route}>Read More</Link></div>
                        {user && (
                            <>
                                <div className="card-edit-btn">
                                    <Link to="/admin" onClick={handlePostEditClick}>Edit Post</Link>
                                </div>
                                <div className="card-remove-btn">
                                    <button onClick={() => removePost(id)}>X</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <img src="../article-pic2.jpeg" alt="logo"/>
            </div>
    );
}