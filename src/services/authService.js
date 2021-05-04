export default class AuthService {
    signup = async (user) => {
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    }

    signin = async (user) => {
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    }

    signout = async (next) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('jwt');
            next();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
                method: 'GET'
            });
            const data = await response.json();
            console.log(data);
            return data;       
        }  
    }

    authenticate = (data, next) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('jwt', JSON.stringify(data));
            next();
        }
    }

    isAuthenticated = () => {
        if (typeof window === 'undefined') {
            return false;   
        }
        if (localStorage.getItem('jwt')) {
            return !!localStorage.getItem('jwt');
        }
        else {
            return false;
        }
    }

    getLoggedInUser = () => {
        let user = null;
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('jwt')) {
                user = JSON.parse(localStorage.getItem('jwt'));
            }       
        }
        return user;  
    }
}