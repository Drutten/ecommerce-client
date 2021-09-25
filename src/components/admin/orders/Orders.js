import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AuthService from '../../../services/authService';
import OrderService from '../../../services/orderService';
import Card from '../../card/Card';
import Layout from '../../layout/Layout';
import OrderItem from '../orderItem/OrderItem';
import OrderDetails from '../orderDetails/OrderDetails';
import EditOrder from '../editOrder/EditOrder';
import './Orders.css';


const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [menuItems] = useState([
        {id: 1, name: 'Ordrar', path: '/orders'},
        {id: 2, name: 'Ny kategori', path: '/create/category'},
        {id: 3, name: 'Ny produkt', path: '/create/product'},
        {id: 4, name: 'Produkter', path: '/admin/products'}
    ]);

    const authService = new AuthService();
    const orderService = new OrderService();
    const userId = authService.getLoggedInUser().user._id;
    const token = authService.getLoggedInUser().token;
    const spinner  =<FontAwesomeIcon icon={faSpinner}/>



    useEffect(() => {
        fetchOrders(userId, token);
        fetchStatusOptions(userId, token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    useEffect(() => {
        document.title = 'Ordrar';
    }, []);



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
            // console.log(result);
            updateSelectedItem(result);
            setOrders(result);
        }    
    }



    const fetchStatusOptions = async () => {
        const result = await orderService.getStatusOptions(userId, token);
        if (result.error) {
            console.log(result.error);
        }
        else {
            setStatusOptions(result);
        }
    }



    const removeOrder = async (orderId) => {
        setError('');
        const result = await orderService.deleteOrder(orderId, userId, token);
        if (result.error) {
            setError(result.error);
        }
        else {
            backToList();
            fetchOrders(userId, token);
        }
    }



    const enterEditMode = (item = null) => {
        const order = (selectedItem) ? selectedItem : item;
        setSelectedItem(order);
        setEditMode(true);
    }



    const viewOrder = (item) => {
        setSelectedItem(item);    
    }



    const backToList = () => {
        setSelectedItem(null);
        setEditMode(false);
    }



    const updateStatus = async (status, orderId) => {
        const result = await orderService.updateOrderStatus(userId, token, orderId, status);
        if (result.error) {
            setError('Status kunde inte uppdateras');
        }
        else {
            fetchOrders(userId, token);
        }
    }



    const updateSelectedItem = (list) => {
        if (selectedItem) {
            list.forEach(item => {
                if (selectedItem._id === item._id) {
                    setSelectedItem({...item});
                }
            });
        }  
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
            <Card title={(selectedItem) ? 'Order' : 'Ordrar'}>
                {displayError()}
                {displayMessage()}
                {displayLoading()}
                { (!selectedItem) && <div>
                    {orders.length > 0 ? (
                        <ul className="order-list">
                            {orders.map((item, i) => <OrderItem
                                key={item._id}
                                item={item}
                                enterEditMode={enterEditMode}
                                viewItem={viewOrder}
                                background={setItemBackground(i)}
                            />)}
                        </ul>
                    ) : ''}
                </div>}

                { (selectedItem && !editMode) ? (
                    <OrderDetails 
                        item={selectedItem} 
                        removeItem={removeOrder} 
                        enterEditMode={enterEditMode}
                        backToList={backToList} />
                )
                : ''
                }

                {(selectedItem && editMode) ? (
                    <EditOrder
                        item={selectedItem}
                        statusOptions={statusOptions}
                        updateStatus={updateStatus}
                        removeItem={removeOrder}
                        backToList={backToList} />
                )
                : ''
                }
            

            </Card>
        </Layout>
    )
}

export default Orders;