import './news-letter-component.css'
export function NewsLetter() {
    return (
        <div className="news-letter">
            <div className="news-letter-text">
                <h3 className="news-letter-header">Guy's Blog Newsletter</h3>
                <p className="news-letter-paragraph">A bi-weekly newsletter of design inspiration, resources and anything related to career development.</p>
            </div>
            <div className="news-letter-email-box">
                <input className="news-letter-input" type="text" placeholder="Email Address"/>
                <a className="news-letter-button">Subscribe</a>
            </div>
        </div>
    );
}