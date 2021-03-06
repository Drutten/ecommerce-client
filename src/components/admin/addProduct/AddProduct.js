import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../services/authService';
import Layout from '../../layout/Layout';
import Card from '../../card/Card';
import './AddProduct.css';
import ProductService from '../../../services/productService';
import CategoryService from '../../../services/categoryService';

const AddProduct = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        shipping: '',
        quantity: '',
        image: '',
    });

    const [currentStatus, setCurrentStatus] = useState({
        loading: false,
        error: '',
        success: false,
    });

    const [categories, setCategories] = useState([]);

    const {
        name,
        description,
        price,
        quantity,
    } = formValues;

    const {
        loading,
        error,
        success,
    } = currentStatus;
    
    
    const menuItems = [
        {id: 1, name: 'Ordrar', path: '/orders'},
        {id: 2, name: 'Ny kategori', path: '/create/category'},
        {id: 3, name: 'Ny produkt', path: '/create/product'},
        {id: 4, name: 'Produkter', path: '/admin/products'}
    ];

    const authService = new AuthService();
    const productService = new ProductService();
    const categoryService = new CategoryService();

    const user = (authService.getLoggedInUser()) ? authService.getLoggedInUser().user : null;
    const token = (authService.getLoggedInUser()) ? authService.getLoggedInUser().token : '';



    useEffect(() => {
        document.title = 'Ny produkt';
    }, []);



    useEffect(() => {
        const init = async () => {
            const result = await categoryService.getCategories();
            if (result.error) {
                setCurrentStatus({...currentStatus, error: result.error});
            }
            else {
                setCategories(result);
            }
        }
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i in formValues) {
            formData.set(i, formValues[i]);
        }
        setCurrentStatus({
            ...currentStatus,
            loading: true,  
            error: '', 
            success: false, 
        });
        
        const result = await productService.createProduct(user._id, token, formData);
        if (result.error) {
            setCurrentStatus({...currentStatus, error: result.error, success: false, loading: false});
        }
        else {
            setFormValues({
                ...formValues, 
                name: '',
                description: '',
                price: '',
                category: '',
                shipping: '',
                quantity: '',
                image: '',
            });

            setCurrentStatus({
                ...currentStatus,
                loading: false,
                error: '',
                success: true,
            });
        }
    }



    const handleChange = (key) => (e) => {
        const value = (key === 'image') ? e.target.files[0] : e.target.value;
        setFormValues({...formValues, [key]: value});
    }



    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )



    const displaySuccess = () => (
        <div className={ (success) ? 'success' : 'not-displayed' }>
            Produkt har lagts till
        </div>
    );



    const displayLoading = () => (
        <div className={ (loading) ? 'spinner' : 'not-displayed' }>
            Laddar...
        </div>
    );



    const productForm = () => (
        <form className="product-form" onSubmit={handleSubmit}>
            
            <div className="form-item">
                <label htmlFor="image">Ladda upp bild</label>
                <div className="file-wrapper">
                <input
                    id="image"
                    className="file-btn"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange('image')}
                />
                </div>
            </div>

            <div className="form-item">
                <label htmlFor="name">Produktens namn</label><br/>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleChange('name')}
                />
            </div>

            <div className="form-item">
                <label htmlFor="description">Beskrivning</label><br/>
                <textarea
                    id="description"
                    value={description}
                    onChange={handleChange('description')}
                />
            </div>

            <div className="form-item">
                <label htmlFor="price">Styckpris</label><br/>
                <input
                    id="price"
                    type="number"
                    value={price}
                    min="0"
                    onChange={handleChange('price')}
                />
            </div>

            <div className="form-item">
                <label htmlFor="category">Kategori</label><br/>
                <select id="category" onChange={handleChange('category')}>
                    <option>V??lj kategori</option>
                    {categories && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>    
            </div>

            <div className="form-item">
                <label htmlFor="quantity">Antal i lager</label><br/>
                <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    min="0"
                    onChange={handleChange('quantity')}
                />
            </div>

            <div className="form-item">
                <label htmlFor="shipping">Frakt</label><br/>
                <select id="shipping" onChange={handleChange('shipping')}>
                    <option>V??lj</option>
                    <option value="0">Nej</option>
                    <option value="1">Ja</option>
                </select>
            </div>

            <Link className="cancel-btn" to="/admin/dashboard">Avbryt</Link>
            <button type="submit" className="submit-btn">Spara</button>
        </form>
    );



    return (
        <Layout title="Ny produkt" menuItems={menuItems}>
            <Card title="Ny produkt">
                {displayLoading()}
                {displayError()}
                {displaySuccess()}
                {productForm()}  
            </Card>
        </Layout>
    )
}

export default AddProduct;