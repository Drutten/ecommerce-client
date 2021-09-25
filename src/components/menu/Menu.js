import { useState, useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faHome, faShoppingBag, faUser, faChevronDown, faChevronUp, faListAlt } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/authService';
import './Menu.css';

const Menu = (props) => {

  const [categoryListOpen, setCategoryListOpen] = useState(false);

  const categoryRef = useRef();

  const {history, isOpenMenu, setIsOpenMenu, menuItems = [], categories = [], onFetchByCategory, onFetchAll} = props;

  const home =<FontAwesomeIcon icon={faHome}/>
  const tools =<FontAwesomeIcon icon={faTools}/>
  const bag =<FontAwesomeIcon icon={faShoppingBag}/>
  const userIcon =<FontAwesomeIcon icon={faUser}/>
  const chevronDown =<FontAwesomeIcon icon={faChevronDown}/>
  const chevronUp =<FontAwesomeIcon icon={faChevronUp}/>
  const listAlt =<FontAwesomeIcon icon={faListAlt}/>
  

  const authService = new AuthService();

  const user = (authService.getLoggedInUser()) ? authService.getLoggedInUser().user : null;



  const outsideClick = e => {
    if (categoryRef?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setCategoryListOpen(false); 
  };



  useEffect(() => {
      // add when mounted
      document.addEventListener("mousedown", outsideClick);
      // return function to be called when unmounted
      return () => {
          document.removeEventListener("mousedown", outsideClick);
      };
  }, []);



  const setOpenClass = () => {
    return isOpenMenu ? 'open-menu' : '';
  }



  const handleFetchByCategory = async (item) => {
    await onFetchByCategory(item);
    setIsOpenMenu(false);
  }



  const handleFetchAll = async () => {
    await onFetchAll();
    setIsOpenMenu(false);
  }



  const toggleCategoryList = (e, close = false) => {
    if (close) {
      setCategoryListOpen(false);
    }
    else {
      setCategoryListOpen(!categoryListOpen);
    }
  }



  const getCategoryListOpenClass = () => {
    return (categoryListOpen) ? 'isOpenCategories': '';
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

      {authService.getLoggedInUser() && authService.getLoggedInUser().user.role === 0 && (
        <li className={`${getActiveClass(history, '/profile')}`}><Link className="menu-item" to="/profile"><span>{userIcon}</span>Profil</Link></li>
      )}

      {authService.getLoggedInUser() && authService.getLoggedInUser().user.role === 1 && (
        <li className={`${getActiveClass(history, '/admin')}`}><Link className="menu-item" to="/admin"><span>{userIcon}</span>Administratör</Link></li> 
      )}

      {authService.getLoggedInUser() && (
        <li className={getActiveClass(history, `/edit-profile/${user._id}`)}><Link className="menu-item" to={`/edit-profile/${user._id}`}><span>{tools}</span>Redigera profil</Link></li>
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
        
        <li className="category-dropdown" ref={categoryRef}>
          <span className="chevron" onClick={toggleCategoryList}>{(categoryListOpen) ? chevronUp : chevronDown}</span>
          <div className="menu-item"><span>{listAlt}</span>Kategorier
            <ul className={`category-list ${getCategoryListOpenClass()}`}>
              <li className="category-item" onClick={handleFetchAll}>
                <div className="menu-item"><span></span>Alla produkter</div>
              </li>
              {(categories.length > 0) && categories.map(item => {
                return (
                  <li
                    key={item._id} 
                    className="category-item"
                    onClick={() => handleFetchByCategory(item)}
                  >
                    <div className="menu-item"><span></span>{addCapitalLetter(item.name)}</div>
                  </li>
                )
              })}
            </ul>
          </div>
        </li>
      )}
 
    </ul>
  );

}

export default withRouter(Menu);
