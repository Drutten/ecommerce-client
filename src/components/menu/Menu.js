import { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faHome, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/authService';
import './Menu.css';

const Menu = (props) => {

  const {history, isOpenMenu, menuItems = [], categories = [], onFetchByCategory, onFetchAll} = props;

  const icon = 'icon';

  const home =<FontAwesomeIcon icon={faHome}/>
  const tools =<FontAwesomeIcon icon={faTools}/>
  const bag =<FontAwesomeIcon icon={faShoppingBag}/>
  const userIcon =<FontAwesomeIcon icon={faUser}/>
  

  const authService = new AuthService();

  const user = (authService.getLoggedInUser()) ? authService.getLoggedInUser().user : null;

  const setOpenClass = () => {
    return isOpenMenu ? 'open-menu' : '';
  }

  const getActiveClass = (history, path) => {
    if (history.location.pathname === path) {
        return 'active';
    }
    else {
        return '';
    }
  }

  const addCapitalLetter = (text) => (`${text.charAt(0).toUpperCase()}${text.slice(1)}`);

  
  return(
    <ul className={`menu ${setOpenClass()}`}>
      <li className={`${getActiveClass(history, '/')}`}><Link className="menu-item" to="/"><span>{home}</span>Start</Link></li>
      <li className={`${getActiveClass(history, '/cart')}`}><Link className="menu-item" to="/cart"><span>{bag}</span>Varukorg</Link></li>

      {authService.getLoggedInUser() && (
        <li className={getActiveClass(history, `/profile/${user._id}`)}><Link className="menu-item" to={`/profile/${user._id}`}><span>{userIcon}</span>Profil</Link></li>
      )}

      {authService.getLoggedInUser() && authService.getLoggedInUser().user.role === 0 && (
        <li className={`${getActiveClass(history, '/dashboard')}`}><Link className="menu-item" to="/dashboard"><span>{tools}</span>Kontrollpanel</Link></li>
      )}

      {authService.getLoggedInUser() && authService.getLoggedInUser().user.role === 1 && (
        <li className={`${getActiveClass(history, '/admin/dashboard')}`}><Link className="menu-item" to="/admin/dashboard"><span>{tools}</span>Administratör</Link></li> 
      )}

      {(menuItems.length > 0) && menuItems.map(item => {
        return (
          <li
            key={item.id} 
            className={`${getActiveClass(history, `${item.path}`)}`}>
            <Link className="menu-item" to={item.path}><span></span>{addCapitalLetter(item.name)}</Link>
          </li>  
        )
      })}

      {(categories.length > 0) && (
        <Fragment>
        <li className="category-space">
          <div className="menu-item"></div>
        </li>
        <li className="category-item" onClick={onFetchAll}>
          <div className="menu-item"><span></span>Alla produkter</div>
        </li>
      </Fragment>
      )
      }

      {(categories.length > 0) && categories.map(item => {
        return (
          <li
            key={item._id} 
            className="category-item"
            onClick={() => onFetchByCategory(item)}
          >
            <div className="menu-item"><span></span>{addCapitalLetter(item.name)}</div>
          </li> 
        )
      })}
    </ul>
  );

}

export default withRouter(Menu);
