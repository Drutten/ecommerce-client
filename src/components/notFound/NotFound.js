import { Link } from 'react-router-dom';
import './NotFound.css';


const NotFound = () => {

    return(
        <div className="not-found">
          <h1>404</h1>
          <p>Sidan hittades inte</p>
          <Link className="link-button" to="/">Till butiken</Link>
        </div>
        
    );
  
}
export default NotFound;