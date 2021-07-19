import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AuthService from '../../../services/authService';
import OrderService from '../../../services/orderService';
import DashboardCard from '../../dashboardCard/DashboardCard';
import Layout from '../../layout/Layout';
import OrderItem from '../orderItem/OrderItem';
import OrderDetails from '../orderDetails/OrderDetails';
import './Orders.css';


const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [menuItems] = useState([
        {id: 1, name: 'Ordrar', path: '/orders', icon: 'icon'},
        {id: 2, name: 'Ny kategori', path: '/create/category', icon: 'icon'},
        {id: 3, name: 'Ny produkt', path: '/create/product', icon: 'icon'},
        {id: 4, name: 'Inställningar', path: '/', icon: 'icon'}
    ]);

    const authService = new AuthService();
    const orderService = new OrderService();
    const userId = authService.getLoggedInUser().user._id;
    const token = authService.getLoggedInUser().token;
    const spinner  =<FontAwesomeIcon icon={faSpinner}/>



    const fetchOrders = async (userId, token) => {
        setError('');
        setMessage('');
        setLoading(true);
        const result = await orderService.getOrders(userId, token);
        if (result.error) {
            setLoading(false);
            setError(result.error);
        }
        else {
            setLoading(false);
            if (result.length === 0) {
                setMessage('Inga ordrar hittades');
            }
            console.log(result);
            setOrders(result);
        }    
    }


    useEffect(() => {
        fetchOrders(userId, token);
    }, []);



    const removeOrder = (item) => {
        // BE
    }


    const updateOrder = (updatedItem) => {
        // BE
    }


    const viewOrder = (item) => {
        setSelectedItem(item);    
    }


    const getIndex = (id) => {
        let index = -1;
        orders.forEach((item, i) => {
            if (item._id === id) index = i;
        });
        return index;
    }



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



    const setItemBackground = (index) => {
        return (index % 2 === 0) ? '' : 'shadow';
    }



    return (
        <Layout title="Ordrar" menuItems={menuItems}>
            <DashboardCard title={(selectedItem) ? 'Order' : 'Ordrar'}>
                {displayError()}
                {displayMessage()}
                {displayLoading()}
                { (!selectedItem) && <div>
                    {orders.length > 0 ? (
                        <ul className="order-list">
                            {orders.map((item, i) => <OrderItem
                                key={item._id}
                                item={item}
                                removeItem={removeOrder}
                                updateItem={updateOrder}
                                viewItem={viewOrder}
                                background={setItemBackground(i)}
                            />)}
                        </ul>
                    ) : ''}
                </div>}

                { (selectedItem) ? (
                    <OrderDetails item={selectedItem} removeItem={removeOrder} updateItem={updateOrder} />
                )
                : ''
                }

            </DashboardCard>
        </Layout>
    )
}

export default Orders;