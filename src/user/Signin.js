import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AuthService from '../services/authService';
import './Signin.css';

const Signin = () => {

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirect: false
    });

    const { email, password, error, loading, redirect } = formValues;

    const authService = new AuthService();



    useEffect(() => {
        document.title = 'Logga in';
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
            loading: true
        });
        let result = await authService.signin({ email, password });
        if (result.error) {
            console.log(result.error);
            setFormValues({
                ...formValues,
                error: result.error,
                loading: false
            });
        }
        else {
            authService.authenticate(result, () => {
                setFormValues({
                    ...formValues,
                    redirect: true
                });
            }); 
        }
    }



    const displayError = () => (
        <div className={ error ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )



    const displayLoading = () => (
        <div className={ loading ? 'spinner' : 'not-displayed' }>
            Laddar...
        </div>
    )



    const redirectUser = () => {
        if (redirect) {
            const user = authService.getLoggedInUser().user;
            if (user && user.role === 1) {
                return (
                    <Redirect to="/admin"/>
                )
            }
            return (
                <Redirect to="/"/>
            )
        }
        if (authService.isAuthenticated()) {
            return <Redirect to="/"/>
        }
    }



    const signinForm = () => (
        <form className="signin-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="submit-btn">Logga in</button>
            <p>Ny kund? <Link to="/signup">Registrera dig nu</Link></p>
        </form>
    )



    return (
        <div>
            <header>
                <h1>Logga in</h1>
            </header>
            { displayLoading() }
            { displayError() }
            { signinForm() }
            { redirectUser() }
        </div>
    )
}

export default Signin;