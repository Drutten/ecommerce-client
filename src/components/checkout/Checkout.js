import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { StateContext } from '../../StateContext';
import Layout from '../layout/Layout';
import BraintreeService from '../../services/braintreeService';
import AuthService from '../../services/authService';
import './Checkout.css';

const Checkout = () => {

    const [cartItems, updateCart] = useContext(StateContext);

    const [braintreeToken, setBraintreeToken] = useState(null);
    const [instance, setInstance] = useState({});
    // const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const authService = new AuthService();
    const braintreeService = new BraintreeService();
    const userId = authService.getLoggedInUser().user._id;
    const token = authService.getLoggedInUser().token;
    const spinner  =<FontAwesomeIcon icon={faSpinner}/>


    useEffect(() => {
        fetchBraintreeToken(userId, token);
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



    const pay = () => {
        // send nonce to BE
        setLoading(true);
        setError('');
        setMessage('');
        let nonce;
        // const nonceRequest = 
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
                if (response.success) {
                    setLoading(false);
                    updateCart([]);
                    setMessage('Tack för ditt köp');
                    // TO DO: create order
                }

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



    const displayDropIn = () => {
        if (braintreeToken && cartItems.length > 0) {
            return (
                <div onBlur={() => setError('')}>
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

            <div className="container">
                {cartItems.length ? (
                <div className="total">
                    <h2>Orderöversikt</h2>
                    <p>{getItemsAmountText()}</p>
                    <p>Att betala: <b>{getTotal()}</b> SEK</p>
                </div>
                ) : (
                    <div><h2>Varukorgen är tom</h2></div>
                )}

                {displayLoading()}

                <div className="payment">
                    {displayDropIn()}
                </div>
            </div>
            
            
        </Layout>
    )
}

export default Checkout;