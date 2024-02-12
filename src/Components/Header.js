import '../Styles/header.css'

// this component provides a number of pages with a dynamic header based on their route
export function Header ({props}) {

    const {header, paragraph} = props;

    return (
        <div className="main-header">
            <div className="page-header">{header}</div>
            {paragraph && <p className="page-paragraph">{paragraph}</p>}
        </div>
    );
}