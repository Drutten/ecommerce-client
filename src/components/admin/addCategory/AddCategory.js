import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../services/authService';
import Layout from '../../layout/Layout';
import './AddCategory.css';
import CategoryService from '../../../services/categoryService';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const menuItems = [
        {id: 1, name: 'Kategorier', path: '/create/category', icon: 'icon'},
        {id: 2, name: 'Produkter', path: '/create/product', icon: 'icon'},
        {id: 3, name: 'Inställningar', path: '/', icon: 'icon'}
    ];

    const authService = new AuthService();
    const categoryService = new CategoryService();

    const user = (authService.getLoggedInUser()) ? authService.getLoggedInUser().user : null;
    const token = (authService.getLoggedInUser()) ? authService.getLoggedInUser().token : '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = name;
        setName('');
        setError('');
        setSuccess(false);
        const result = await categoryService.createCategory(user._id, token, {name: category});
        if (result.error) {
            setError(result.error);
        }
        else {
            setError('');
            setSuccess(true);
        }
    }

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }

    const displayError = () => (
        <div className={ error ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )

    const displaySuccess = () => (
        <div className={ success ? 'success' : 'not-displayed' }>
            Kategori har lagts till
        </div>
    )


    const categoryForm = () => (
        <form className="category-form" onSubmit={handleSubmit}>
            <div className="form-item">
                <label>Ny kategori</label><br/>
                <input
                    type="text"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <Link className="cancel-btn" to="/admin/dashboard">Avbryt</Link>
            <button type="submit" className="submit-btn">Spara</button>
        </form>
    );

    return (
        <Layout title="Ny Kategori" menuItems={menuItems}>
            <div>
                {displayError()}
                {displaySuccess()}
                {categoryForm()}
            </div>
        </Layout>
    )
}

export default AddCategory;