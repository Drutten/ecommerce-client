export default class OrderService {

    getOrders = async (userId, token) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/all/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();    
    }


    getPurchaseHistory = async (userId, token) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/user/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();   
    }


    getStatusOptions = async (userId, token) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/status-options/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    }



    createOrder = async (userId, token, data) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({order: data})
        });
        return await response.json();
    }


    updateOrderStatus = async (userId, token, orderId, status) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}/status/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({status, orderId})
        });
        return await response.json();
    }
}