export default class OrderService {

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