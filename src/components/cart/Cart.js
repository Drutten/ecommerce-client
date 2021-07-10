import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { StateContext } from '../../StateContext';
import Layout from '../layout/Layout';
import ItemCard from '../itemCard/ItemCard';
import './Cart.css';

const Cart = () => {

    const [cartItems] = useContext(StateContext);

    const [message, setMessage] = useState('');


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
        >
            
            {displayMessage()}

            <div className="sm-title">
                <h1>Varukorg</h1>
            </div>

            {(cartItems.length === 0) && <div className="empty-cart-container">
                <div className="empty-cart">
                    <h2>Din varukorg är tom</h2>
                    <Link to="/" className="link-button" id="empty-button">Fortsätt handla</Link>
                </div>
            </div>}
            
            <div className="cart-wrapper">
                
                {cartItems && cartItems.map(cartItem => 
                    <ItemCard key={cartItem._id} item={cartItem}></ItemCard>
                )}

                {cartItems.length > 0 && <div className="total">
                    <span>Totalt att betala: <b>{getTotal()}</b> SEK</span>
                    <Link to="/checkout" className="link-button">Till kassan</Link>
                    <Link to="/" className="link-button">Fortsätt handla</Link>
                </div>}

            </div>

            
            
        </Layout>
    )
}

export default Cart;