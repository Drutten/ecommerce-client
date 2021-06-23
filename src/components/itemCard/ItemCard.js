import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { StateContext } from '../../StateContext';
import ProductImage from '../productImage/ProductImage';
import './ItemCard.css';


const ItemCard = ({item}) => {

    const [cartItems, updateCart] = useContext(StateContext);
    
    const trash  =<FontAwesomeIcon icon={faTrash}/>
    const plus  =<FontAwesomeIcon icon={faPlus}/>
    const minus  =<FontAwesomeIcon icon={faMinus}/>


    const removeFromCart = () => {
        const index = getIndex(item._id);
        if (index !== -1) {
            const updatedCart = [...cartItems];
            updatedCart.splice(index, 1);
            updateCart(updatedCart);
        }
    }


    const incrementItem = () => {
        updateAmount(1);   
    }


    const decrementItem = () => {
        if (item.amount > 1) {
            updateAmount(-1);
        }
    }


    const updateAmount = (num) => {
        const index = getIndex(item._id);
        if (index !== -1) {
            const updatedItem = {...item, amount: item.amount + num}
            const updatedCart = [...cartItems];
            updatedCart.splice(index, 1, updatedItem);
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


    const getItemTotal = () => {
        return item.price * item.amount;
    }
  
    

    return (
        <div>
            {item 
            ? <div className="item-content">
                <div className="item-image">
                    <div className="image">
                        <ProductImage product={item} url="products"></ProductImage>
                    </div>
                </div>
                <div className="item-body">
                    <div className="item-info">
                        <h2>{item.name}</h2>
                        <span>à {item.price} SEK</span>
                    </div>

                    <div className="item-amount">
                        {item.amount > 1 
                        ? <button onClick={decrementItem} title="Minska" className="amount-button">{minus}</button>
                        : <button disabled className="amount-button disabled">{minus}</button>
                        }

                        <span className="amount-number"><b>{item.amount}</b></span>
                        <button onClick={incrementItem} title="Öka" className="amount-button">{plus}</button>
                    </div>

                    <div className="item-total">
                        <span><b>{getItemTotal()}</b> SEK</span>
                    </div>

                    <div className="trash-bin">
                        <button onClick={removeFromCart} title="Ta bort">{trash}</button>
                    </div>
                    
                </div>
                
                
            </div> : ''}
        </div>
    )
}

export default ItemCard;