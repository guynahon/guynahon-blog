import './Card.css'
export function ArticleCard() {
    return (
        <div className="card">
            <div className="card-content-frame">
                <h5 className="card-date">August 13, 2021</h5>
                <div className="card-text">
                    <h3 className="card-header">10 Hilarious Cartoons That Depict Real-Life Problems of Programmers</h3>
                    <p className="card-paragraph">Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks.</p>
                </div>
            </div>
            <img src="article-pic2.jpeg" alt="logo"/>
        </div>
    );
}