export default class BraintreeService {
    
    getBraintreeToken = async (userId, token) => {
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/braintree/getToken/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    }


    processPayment = async (userId, token, data) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/braintree/payment/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await response.json();    
    }
}