import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { StateContext } from '../../StateContext';
import ProductImage from '../productImage/ProductImage';
import './ItemCard.css';


const ItemCard = ({item}) => {

    const [cartItems, updateCart] = useContext(StateContext);
    
    const trash  =<FontAwesomeIcon icon={faTrash}/>


    const removeFromCart = (item) => {
        const index = getIndex(item._id);
        if (index !== -1) {
            const updatedCart = [...cartItems];
            updatedCart.splice(index, 1);
            updateCart(updatedCart);
        }
    }


    const getIndex = (id) => {
        let index = -1;
        cartItems.forEach((item, i) => {
            if (item._id === id) index = i;
        });
        return index;
    }
  
    

    return (
        <div>
            {item 
            ? <div>
                <p>{item.name}</p>
                <ProductImage product={item} url="products"></ProductImage>
            </div> : ''}
        </div>
    )
}

export default ItemCard;