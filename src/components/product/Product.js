import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faNotEqual, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import { StateContext } from '../../StateContext';
import ProductService from '../../services/productService';
import Layout from '../layout/Layout';
import ProductImage from '../productImage/ProductImage';
import './Product.css';

const Product = () => {

    const [cartItems, updateCart] = useContext(StateContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isFullDescription, setIsFullDescription] = useState(false);
    // const [message, setMessage] = useState('');
    const { productId } = useParams();

    const cartPlus =<FontAwesomeIcon icon={faCartPlus}/>
    const notEqual =<FontAwesomeIcon icon={faNotEqual}/>
    // const solidHeart =<FontAwesomeIcon icon={fasHeart}/>
    const regularHeart =<FontAwesomeIcon icon={farHeart}/>
    const chevronCircleLeft =<FontAwesomeIcon icon={faChevronCircleLeft}/>



    useEffect(() => {
        const fetchProduct = async () => {
            const productService = new ProductService();
            setLoading(true);
            const result = await productService.getProduct(productId);
            if (result.error) {
                setError(result.error);
                setLoading(false);
            }
            else {
                setProduct(result);
                setLoading(false);
                document.title = result.name;
            }
        }
        fetchProduct();    
    }, [productId]);



    const addToCart = () => {
        if (getIndex(product._id) === -1) {
            const cartItem = {...product, amount: 1}
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



    const getQuantityClass = () => {
        return (product.quantity < 10) ? 'danger' : ''
    }



    const toggleDescription = () => {
        setIsFullDescription(!isFullDescription);
    }



    const isSoldOut = () => {
        return product.quantity < 1;
    }



    const getNotDisplayedClass = () => {
        return (isSoldOut()) ? 'not-displayed' : '';
    }
    


    const displayDescription = (text = '') => {
        const displayedChars = 20;
        let displayedText = text;
        let buttonText = '';
        if (text.length > displayedChars && !isFullDescription) {
            displayedText = text.substring(0, displayedChars + 1);
            buttonText = 'L??s mer';
        }
        if (text.length > displayedChars && isFullDescription) 
            buttonText = 'L??s mindre';
        
        return (
            <div>
                <p>{displayedText}</p>
                {(buttonText) 
                    ? <button 
                        className="descriptionButton" 
                        onClick={toggleDescription}>{buttonText}
                    </button>
                    : ''}
            </div>
        )
    }



    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )



    // const displayMessage = () => (
    //     <div className={ (message) ? 'message' : 'not-displayed' }>
    //         {message}
    //     </div>
    // )



    const displayLoading = () => (
        <div className={ (loading) ? 'spinner' : 'not-displayed' }>
            Laddar...
        </div>
    );

    

    return (
        <Layout title={(product && product.name) ? product.name : 'Lilla Butiken'}>
            {displayLoading()}
            {displayError()}
            {product && 
                <div>
                    <div className="product-container">
                    <Link to='/' className="back-button">{chevronCircleLeft}</Link>
                        <div className="image-container">
                            <div className="image">
                                <ProductImage product={product} url="products"/>
                            </div>
                        </div>
                        <div className="info-container">
                            <div className="info">
                                <div className="info-title">
                                    <h2>{product.name}</h2> 
                                    <span>{product.category.name}</span>
                                </div>
                                <div className="info-details">
                                    {(isSoldOut()) ? (<span className={getQuantityClass()}>Slut</span>)
                                    : (<span className={getQuantityClass()}>{product.quantity} i lager</span>)}
                                    <span><b>{product.price}</b> SEK</span>
                                </div>
                                <div className="info-buttons">


                                {(!isInCart()) ? <button 
                                    className={`add-button ${getNotDisplayedClass()}`}
                                    title="L??gg i varukorgen" 
                                    onClick={addToCart}>
                                        <span>{cartPlus}</span><span>K??p</span>
                                    </button>
                            
                                : <button 
                                    className="add-button" 
                                    title="Ta bort fr??n varukorgen" 
                                    onClick={removeFromCart}>
                                        <span>{notEqual}</span><span>Ta bort</span>
                                    </button> 
                                }

                                    <button className="fav-button"><span>{regularHeart}</span><span>Favorit</span></button>
                                </div>
                                <div className="info-description">
                                    <h3>Beskrivning</h3>
                                    {displayDescription(product.description)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }    
        </Layout>
    )
}

export default Product;