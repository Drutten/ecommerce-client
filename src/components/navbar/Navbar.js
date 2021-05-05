import { useState, useEffect, useRef, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';
import AuthService from '../../services/authService';


const user = <FontAwesomeIcon icon={faUser}/>;
const bag = <FontAwesomeIcon icon={faShoppingBag}/>;


const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const node = useRef();

    const authService = new AuthService();

    const getActiveClass = (history, path) => {
        if (history.location.pathname === path) {
            return 'active';
        }
        else {
            return '';
        }
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        setIsOpen(false); 
      };

      useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    return (
        <nav className="navbar">
            <ul className="nav">
                <li className="nav-item lilla-butiken-logo">
                    <Link className="nav-link" to="/">Lilla Butiken</Link>   
                </li>  
            </ul>
            <div className="user-icons">
                <div className="dropdown" ref={node}>
                    <div className="user" onClick={toggleDropdown}>{user}</div>
                    <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                        <ul>
                            {!authService.isAuthenticated() && (
                                <Fragment>
                                    <li className="dropdown-item">
                                        <Link className={`dropdown-link ${getActiveClass(props.history, '/signin')}`} to="/signin">Logga in</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link className={`dropdown-link ${getActiveClass(props.history, '/signup')}`} to="/signup">Ny kund</Link>
                                    </li>
                                </Fragment>
                            )}
                            {authService.isAuthenticated() && (
                                <li className="dropdown-item" onClick={ () => authService.signout(() => {
                                    props.history.push('/');
                                })}>
                                    <span className="dropdown-link">Logga ut</span>
                                </li>    
                            )}  
                        </ul>
                    </div>
                </div>
                <div className="bag">{bag} <span className="badge">0</span></div>  
            </div>
        </nav>
    )
}

export default withRouter(Navbar);