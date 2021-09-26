import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import AuthService from '../../../services/authService';
import Layout from '../../layout/Layout';
import Card from '../../card/Card';
import ProductService from '../../../services/productService';
import CategoryService from '../../../services/categoryService';
import './EditProduct.css';

const EditProduct = () => {

    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        shipping: '',
        quantity: '',
        image: '',
    });

    const [formData, setFormData] = useState('');

    const [currentStatus, setCurrentStatus] = useState({
        loading: false,
        error: '',
        success: false
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

    const { productId } = useParams();
    const user = (authService.getLoggedInUser()) ? authService.getLoggedInUser().user : null;
    const token = (authService.getLoggedInUser()) ? authService.getLoggedInUser().token : '';



    useEffect(() => {
        document.title = 'Redigera produkt';
    }, []);



    useEffect(() => {
        const init = async (productId) => {
            setCurrentStatus({...currentStatus, error: '', loading: true});
            const result = await productService.getProduct(productId);
            if (result.error) {
                setCurrentStatus({...currentStatus, error: result.error, loading: false});
            }
            else {
                setCurrentStatus({...currentStatus, loading: false});
                setFormValues({
                    ...formValues,
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    category: result.category._id,
                    shipping: result.shipping,
                    quantity: result.quantity
                })
                setFormData(new FormData());
                fetchCategories();
            }
        }
        init(productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const fetchCategories = async () => {
        const result = await categoryService.getCategories();
        if (result.error) {
            setCurrentStatus({...currentStatus, error: result.error});
        }
        else {
            setCategories(result);
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setCurrentStatus({
            ...currentStatus,
            loading: true,  
            error: '', 
            success: false, 
        });
        const result = await productService.updateProduct(
            productId,
            user._id,
            token,
            formData
        );
        if (result.error) {
            setCurrentStatus({...currentStatus, error: result.error, loading: false});
        }
        else {
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
        formData.set(key, value)
        setFormValues({...formValues, [key]: value});
    }



    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )



    const displaySuccess = () => (
        <div className={ (success) ? 'success' : 'not-displayed' }>
            Produkten har uppdaterats
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
                    <option>Välj kategori</option>
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
                    <option>Välj</option>
                    <option value="0">Nej</option>
                    <option value="1">Ja</option>
                </select>
            </div>

            <Link className="cancel-btn" to="/admin/products">Avbryt</Link>
            <button type="submit" className="submit-btn">Spara</button>
        </form>
    );



    return (
        <Layout title="Redigera produkt" menuItems={menuItems}>
            <Card title={formValues.name}>
                {displayLoading()}
                {displayError()}
                {displaySuccess()}
                {productForm()}  
            </Card>
        </Layout>
    )
}

export default EditProduct;