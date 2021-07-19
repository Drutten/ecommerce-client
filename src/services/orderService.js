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
}