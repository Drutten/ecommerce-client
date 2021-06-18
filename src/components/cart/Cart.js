import { useState, useEffect, useContext } from 'react';
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
            
            <div className="cart-wrapper">
                {cartItems && cartItems.map(cartItem => 
                    <ItemCard key={cartItem._id} item={cartItem}></ItemCard>
                )}
            </div>
            
        </Layout>
    )
}

export default Cart;