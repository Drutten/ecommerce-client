import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { StateContext } from '../../StateContext';
import Layout from '../layout/Layout';
import BraintreeService from '../../services/braintreeService';
import AuthService from '../../services/authService';
import OrderService from '../../services/orderService';
import ProductService from '../../services/productService';
import './Checkout.css';

const Checkout = () => {

    const [cartItems, updateCart] = useContext(StateContext);

    const [braintreeToken, setBraintreeToken] = useState(null);
    const [instance, setInstance] = useState({});
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const authService = new AuthService();
    const braintreeService = new BraintreeService();
    const orderService = new OrderService();
    const productService = new ProductService();

    const userId = (authService.isAuthenticated()) ? authService.getLoggedInUser().user._id : '';
    const token = (authService.isAuthenticated()) ? authService.getLoggedInUser().token : '';
    const spinner  =<FontAwesomeIcon icon={faSpinner}/>



    useEffect(() => {
        document.title = 'Kassan';
    }, []);



    useEffect(() => {
        if (authService.isAuthenticated()) {
            fetchBraintreeToken(userId, token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const fetchBraintreeToken = async (userId, token) => {
        setError('');
        const result = await braintreeService.getBraintreeToken(userId, token);
    
        if (result.error) {
            setError(result.error);
        }
        else {
            setBraintreeToken(result);
        }
    }



    const getListOfIds = () => {
        const ids = [];
        cartItems.forEach((item) => {
            ids.push(item._id);
        });
        return ids;
    }


    
    const isEnoughQuantity = (item) => {
        let enough = true;
        cartItems.forEach((cItem) => {
            if (cItem._id === item._id) {
                console.log(item.quantity, cItem.amount)
                console.log(item.quantity - cItem.amount);
                if ((item.quantity - cItem.amount) < 0) {
                    enough = false;
                }
            }
        });
        return enough;
    }



    const pay = async () => {
        const ids = getListOfIds();
        setError('');
        const result = await productService.getProductsByIds(ids);
        if (result.error || result.length !== cartItems.length) {
            setError('Produkter kunde inte hämtas');
        }
        else {
            let enoughQuantity = true;
            for (let i = 0; i < result.length; i++) {
                enoughQuantity = isEnoughQuantity(result[i]);
                if (!enoughQuantity) {
                    break;
                }  
            }
            if (!enoughQuantity) {
                setError('Ej tillräckligt i lager');   
            }
            else {
                processPayment();
            }
        }
    }



    const processPayment = () => {
        // send nonce to BE
        setLoading(true);
        setError('');
        setMessage('');
        let nonce;
        instance.requestPaymentMethod()
        .then(result => {
            nonce = result.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal()
            }
            braintreeService.processPayment(userId, token, paymentData)
            .then(response => {
                // console.log(response);
                const orderData = {
                    products: cartItems,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: address
                }
                orderService.createOrder(userId, token, orderData)
                .then(res => {
                    setLoading(false);
                    setAddress('');
                    updateCart([]);
                    setMessage('Tack för ditt köp');
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                })
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        })
        .catch(error => {
            setError(error.message);
        })
    }



    const handleAddress = (e) => {
        setAddress(e.target.value);
    }



    const displayDropIn = () => {
        if (braintreeToken && cartItems.length > 0) {
            return (
                <div onBlur={() => setError('')}>
                    <div className="address-form-group">
                        <label htmlFor="address">Postadress</label>
                        <textarea
                            className="address"
                            onChange={handleAddress}
                            id="address"
                            value={address}
                            placeholder="Ange gatuadress, postnummer och postort"
                        />
                    </div>
                    <DropIn 
                        options={{
                            authorization: braintreeToken.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={(instance) => (setInstance(instance))}
                    />
                    <div className="drop-in-buttons">
                        <Link className="drop-in-button" to="/cart">Avbryt</Link>
                        <button onClick={pay} className="drop-in-button">Betala</button>
                    </div>
                    
                </div>
            )
        }
    }



    const getTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += (item.price * item.amount);    
        });
        return total;
    }



    const getItemsAmountText = () => {
        let amount = 0;
        cartItems.forEach(item => {
            amount += item.amount;
        });
        if (!amount) {
            return '';
        }
        return (amount === 1) ? `${amount} vara` : `${amount} varor`;
    }

    

    const displayMessage = () => (
        <div className={ (message) ? 'message' : 'not-displayed' }>
            {message}
        </div>
    )


    
    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )



    const displayLoading = () => (
        <div className={ (loading) ? 'spinner' : 'not-displayed' }>
            {spinner}
        </div>
    );



    return (
        <Layout 
            title="Kassa"
        >
            {displayMessage()}
            {displayError()}

            <div className="sm-title">
                <h1>Kassa</h1>
            </div>

            { (authService.isAuthenticated()) && <div className="container">
                {cartItems.length ? (
                <div className="total">
                    <h2>Orderöversikt</h2>
                    <p>{getItemsAmountText()}</p>
                    <p>Att betala: <b>{getTotal()}</b> SEK</p>
                </div>
                ) : (
                    <div className="empty-cart">
                        <h2>Din varukorg är tom</h2>
                        <Link to="/" className="link-button" id="empty-button">Till butiken</Link>
                    </div>
                )}

                {displayLoading()}

                <div className="payment">
                    {displayDropIn()}
                </div>
            </div>}   
        </Layout>
    )
}

export default Checkout;