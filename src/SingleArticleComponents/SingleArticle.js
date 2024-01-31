import './SingleArticle.css'


export function SingleArticle({singlePost}) {

    return (
            <div className="single-article-block">
                { singlePost ? (
                    <>
                        <div className="image-container">
                            <img className="larger-img" src={`https://picsum.photos/300/300?${singlePost.id}`} alt={"random-picture "+singlePost.id}/>
                        </div>
                        <div className="article-paragraphs">
                            <p className="single-paragraph">{singlePost.body}</p>
                        </div>
                    </>
                    ) : (
                        // loading message until the post loads.
                    <div className="loading-bg">
                        <span className="loading-msg">Loading...</span>
                    </div>
                    )}
            </div>
    );
}