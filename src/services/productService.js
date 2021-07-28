import queryString from 'query-string';

export default class ProductService {

    getProduct = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: "GET"
        });
        return await response.json();   
    }
    


    getProducts = async (sort = 'createdAt', order = 'desc', limit = '') => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products?sort=${sort}&order=${order}&limit=${limit}`, {
            method: "GET"
        });
        return await response.json();   
    }



    getProductsByCategory = async (sort, category) => {
        const data = {
            sort: sort,
            category: category
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/filter`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    

    getProductsBySearch = async (queryParams) => {
        const query = queryString.stringify(queryParams)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/search?${query}`, {
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



    updateProduct = async (productId, userId, token, product) => {
        console.log(product);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        });
        return await response.json();    
    }



    deleteProduct = async (productId, userId, token) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();    
    }
}