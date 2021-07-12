import queryString from 'query-string';

export default class ProductService {

    getProduct = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: "GET"
        });
        return await response.json();   
    }
    


    getProducts = async (sort) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products?sort=${sort}&order=desc&limit=6`, {
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
}