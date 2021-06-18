import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faNotEqual } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { StateContext } from '../../StateContext';
import ProductImage from '../productImage/ProductImage';
import './ProductCard.css';

const ProductCard = ({product}) => {

    const [cartItems, updateCart] = useContext(StateContext);

    const cartPlus =<FontAwesomeIcon icon={faCartPlus}/>
    const notEqual =<FontAwesomeIcon icon={faNotEqual}/>
    // const solidHeart =<FontAwesomeIcon icon={fasHeart}/>
    const regularHeart =<FontAwesomeIcon icon={farHeart}/>



    const addToCart = () => {
        if (getIndex(product._id) === -1) {
            const cartItem = {...product, amount: 1};
            updateCart([...cartItems, cartItem]);
        }
    }

    const removeFromCart = () => {
        const index = getIndex(product._id);
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


    const isInCart = () => {
        if (getIndex(product._id) !== -1) {
            return true;
        }
        return false;
    }

    
    return (
        
        <div className="product-card">
            <div className="product-content">
                <Link to={`/products/${product._id}`} className="image">
                    <ProductImage product={product} url="products"/>   
                </Link>

                <div className="product-card-body">

                    <div className="info">
                        <div className="product-card-title">
                            <h3>{product.name}</h3>
                            <span>{product.category.name}</span>
                        </div>

                        <div className="product-card-info">
                            <span><b>{product.price}</b> SEK</span>
                            <span>{product.quantity} i lager</span>
                            <div className="card-button">
                                {(!isInCart()) ? <button 
                                    className="card-btn" 
                                    title="Lägg i varukorgen"
                                    onClick={addToCart}>
                                        <span>{cartPlus}</span>
                                        <span className="button-text">Lägg till</span>
                                </button>
                                : <button 
                                    title="Ta bort från varukorgen" 
                                    onClick={removeFromCart}>
                                        <span>{notEqual}</span>
                                        <span className="button-text">Ta bort</span>
                                    </button>    
                                }
                            </div>

                        </div>  
                    </div>    
                </div>
            </div>

            
            {(product.quantity < 10) ? (<span className="warning">Få kvar</span>) 
            : (<span></span>)}
            <span className="heart">{regularHeart}</span>
            {/* <span>{solidHeart}</span> */}
             
        </div>

    )
}

export default ProductCard;