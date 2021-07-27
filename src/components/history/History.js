import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import OrderService from '../../services/orderService';
import './History.css';

const History = ({user, token}) => {

    const orderService = new OrderService();
    const spinner  =<FontAwesomeIcon icon={faSpinner}/>

    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const fetchPurchaseHistory = async (userId, token) => {
        setError('');
        setMessage('');
        setLoading(true);
        const result = await orderService.getPurchaseHistory(userId, token);
        if (result.error) {
            setLoading(false);
            setError(result.error);
        }
        else {
            setLoading(false);
            if (result.length === 0) {
                setMessage('Ingen historik hittades');
            }
            // console.log(result);
        
            setHistory(result);
        }    
    }


    useEffect(() => {
        fetchPurchaseHistory(user._id, token);
    }, []);


    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )


    const displayMessage = () => (
        <div className={ (message) ? 'message' : 'not-displayed' }>
            {message}
        </div>
    )


    const displayLoading = () => (
        <div className={ (loading) ? 'spinner' : 'not-displayed' }>
            {spinner}
        </div>
    );


    const displayHistory = history => {
        return (
            <div>
                <ul className="history-list">
                    {history.map((h, idx) => {
                        return (
                            <li key={idx} className="history-item">
                                {h.products.map((p, i) => {
                                    return (
                                        <div className="history-product" key={i}>
                                            <div>Vara: {p.name}</div>
                                            <div>Styckpris: {p.price} SEK</div>
                                            <div>
                                                Order skapad:{" "}
                                                <Moment fromNow>{h.createdAt}</Moment>
                                            </div>
                                        </div>
                                    );
                                })}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    
    return (
        <div>
            {displayError()}
            {displayMessage()}
            {displayLoading()}
            {displayHistory(history)}
        </div>      
    );
}

export default History;