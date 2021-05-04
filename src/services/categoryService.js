export default class CategoryService {
    

    createCategory = async (userId, token, category) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return await response.json();    
    }


    getCategories = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: "GET"
        });
        return await response.json();
    }
}