import './Card.css'
export function ArticleCard() {
    const day = new Date().getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[new Date().getMonth()];
    const year = new Date().getFullYear();

    return (
        <div className="card">
            <div className="card-content-frame">
                <h5 className="card-date">{day+" "+month+" "+year}</h5>
                <div className="card-text">
                    <h3 className="card-header">10 Hilarious Cartoons That Depict Real-Life Problems of Programmers</h3>
                    <p className="card-paragraph">Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks.</p>
                </div>
            </div>
            <img src="../article-pic2.jpeg" alt="logo"/>
        </div>
    );
}