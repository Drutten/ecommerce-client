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

    signout = (next) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('jwt');
            next();
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

    getUser = async (userId, token) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();      
    }

    updateUser = async (userId, token, user) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        return await response.json();
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

    updateLoggedInUser = (updatedUser, next) => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('jwt')) {
                let auth = JSON.parse(localStorage.getItem('jwt'));
                auth.user = updatedUser;
                localStorage.setItem('jwt', JSON.stringify(auth));
                next();
            }       
        }  
    }
}