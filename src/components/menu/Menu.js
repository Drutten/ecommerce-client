import { Link, withRouter } from 'react-router-dom';
import AuthService from '../../services/authService';
import './Menu.css';

const Menu = (props) => {

  const {history, isOpenMenu, menuItems = [], categories = []} = props;

  const icon = 'icon';

  const authService = new AuthService();

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
      <li className={`${getActiveClass(history, '/')}`}><Link className="menu-link" to="/"><span>{icon}</span>Start</Link></li>
      {authService.getLoggedInUser() && authService.getLoggedInUser().user.role === 0 && (
        <li className={`${getActiveClass(history, '/dashboard')}`}><Link className="menu-link" to="/dashboard"><span>{icon}</span>Kontrollpanel</Link></li>
      )}

      {authService.getLoggedInUser() && authService.getLoggedInUser().user.role === 1 && (
        <li className={`${getActiveClass(history, '/admin/dashboard')}`}><Link className="menu-link" to="/admin/dashboard"><span>{icon}</span>Administratör</Link></li> 
      )}
      

      {(menuItems) && menuItems.map(item => {
        return (
          <li
            key={item.id} 
            className={`${getActiveClass(history, `${item.path}`)}`}>
            <Link className="menu-link" to={item.path}><span>{icon}</span>{addCapitalLetter(item.name)}</Link>
          </li>  
        )
      })}

      {(categories) && categories.map(item => {
        return (
          <li
            key={item._id} 
            className={`${getActiveClass(history, '/')}`}>
            <Link className="menu-link" to='/'><span>icon</span>{addCapitalLetter(item.name)}</Link>
          </li> 
        )
      })}
    </ul>
  );

}

export default withRouter(Menu);
