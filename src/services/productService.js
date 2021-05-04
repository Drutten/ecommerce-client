export default class ProductService {
    

    getProducts = async (sort) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products?sort=${sort}&order=desc&limit=6`, {
            method: "GET"
        });
        return await response.json();
    }


    createProduct = async (userId, token, product) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        });
        return await response.json();    
    }
}