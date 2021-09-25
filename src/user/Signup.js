import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AuthService from '../services/authService';
import './Signup.css';

const Signup = () => {

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: ''
    });

    const { name, email, password, error, success } = formValues;

    const authService = new AuthService();



    useEffect(() => {
        document.title = 'Ny kund';
    }, []);



    const handleChange = (value, e) => {
        setFormValues({
            ...formValues,
            error: false,
            [value]: e.target.value
        });
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormValues({
            ...formValues,
            error: '',
            success: false
        });
        let result = await authService.signup({name, email, password});
        if (result.error) {
            console.log(result.error);
            setFormValues({
                ...formValues,
                error: result.error,
                success: false
            });
        }
        else {
            setFormValues({
                ...formValues,
                name: '',
                email: '',
                password: '',
                error: '',
                success: true
            });
        }
    }



    const displayError = () => (
        <div className={ error ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )



    const displaySuccess = () => (
        <div className={ success ? 'success' : 'not-displayed' }>
            Nytt konto har skapats
        </div>
    )



    const signupForm = () => (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="name">Namn</label><br/>
                <input 
                    type="text" 
                    id="name"
                    value={formValues.name}
                    onChange={(e) => handleChange('name', e)}
                />
            </div>

            <div className="form-field">
                <label htmlFor="email">Email</label><br/>
                <input 
                    type="email" 
                    id="email"
                    value={formValues.email}
                    onChange={(e) => handleChange('email', e)}
                />
            </div>

            <div className="form-field">
                <label htmlFor="password">Lösenord</label><br/>
                <input 
                    type="password" 
                    id="password" 
                    value={formValues.password} 
                    onChange={(e) => handleChange('password', e)}
                />
            </div>

            <Link className="cancel-btn" to="/">Avbryt</Link>
            <button type="submit" className="submit-btn">Registrera</button>
            <p>Redan kund? <Link to="/signin">Logga in</Link></p>
        </form>
    )
    


    return (
        <div>
            <header>
                <h1>Ny kund</h1>
            </header>
            { displaySuccess() }
            { displayError() }
            { signupForm() }
        </div>
    )
}

export default Signup;