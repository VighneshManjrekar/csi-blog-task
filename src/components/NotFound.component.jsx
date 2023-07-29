import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <div className="container my-5">
            <h2>Sorry 404 :(</h2>
            <p>That page cannot be found</p>
            <Link to="/">Home</Link>
        </div>
    )
}

export default NotFound;