import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { StateContext } from '../../StateContext';
import Layout from '../layout/Layout';
import ItemCard from '../itemCard/ItemCard';
import ProductService from '../../services/productService';
import './Cart.css';

const Cart = () => {

    const [cartItems, updateCart] = useContext(StateContext);

    const [message, setMessage] = useState('');
    
    const trash  =<FontAwesomeIcon icon={faTrash}/>


    useEffect(() => {

    }, []);


    const getTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += (item.price * item.amount);    
        });
        return total;
    }

    
    const displayMessage = () => (
        <div className={ (message) ? 'message' : 'not-displayed' }>
            {message}
        </div>
    )


    return (
        
        <Layout 
            title="Varukorg" 
            // categories={categories} 
            // onFetchByCategory={fetchProductsByCategory} 
            // onFetchAll={fetchAll}
        >
            
            {displayMessage()}

            <div className="sm-title">
                <h1>Varukorg</h1>
            </div>
            
            <div className="cart-wrapper">
                {cartItems && cartItems.map(cartItem => 
                    <ItemCard key={cartItem._id} item={cartItem}></ItemCard>
                )}

                <div className="total">
                    <span>Totalt att betala: <b>{getTotal()}</b> SEK</span>
                    <Link to="/" className="link-button">Till kassan</Link>
                    <Link to="/" className="link-button">Fortsätt handla</Link>
                </div>
            </div>

            
            
        </Layout>
    )
}

export default Cart;