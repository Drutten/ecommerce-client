import { useState } from 'react';

import Menu from '../menu/Menu';
import './Layout.css';
import Hamburger from '../hamburger/Hamburger';

const Layout = ({
    title = 'Rubrik',
    menuItems = [],
    categories = [],
    onFetchByCategory,
    onFetchAll,  
    children
}) => {

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const toggleHamburger = () => {
        setIsOpenMenu(!isOpenMenu);
    }
    
    return (
        <div className="layout">
            <header>
                <Hamburger isOpen={isOpenMenu} onToggleHamburger={toggleHamburger}></Hamburger>
                <h1>{title}</h1>
            </header>
            <div className="row">
                <Menu 
                    isOpenMenu={isOpenMenu}
                    setIsOpenMenu={setIsOpenMenu}
                    categories={categories} 
                    menuItems={menuItems} 
                    onFetchByCategory={onFetchByCategory}
                    onFetchAll={onFetchAll}>
                </Menu>
                <div className="content-col">{children}</div>
            </div>
        </div>
    )
}

export default Layout;