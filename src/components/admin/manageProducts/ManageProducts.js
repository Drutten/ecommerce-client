import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import AuthService from '../../../services/authService';
import ProductService from '../../../services/productService';
import Card from '../../card/Card';
import ListItem from '../../listItem/ListItem';
import Layout from '../../layout/Layout';
import './ManageProducts.css';


const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sort] = useState('createdAt');
    const [order] = useState('desc');
    const [limit] = useState('');

    const [menuItems] = useState([
        {id: 1, name: 'Ordrar', path: '/orders'},
        {id: 2, name: 'Ny kategori', path: '/create/category'},
        {id: 3, name: 'Ny produkt', path: '/create/product'},
        {id: 4, name: 'Produkter', path: '/admin/products'}
    ]);

    const authService = new AuthService();
    const productService = new ProductService();
    const userId = authService.getLoggedInUser().user._id;
    const token = authService.getLoggedInUser().token;
    const spinner  =<FontAwesomeIcon icon={faSpinner}/>



    useEffect(() => {
        document.title = 'Produkter';
    }, []);



    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const fetchProducts = async () => {
        setError('');
        setMessage('');
        setLoading(true);
        const result = await productService.getProducts(sort, order, limit);
        if (result.error) {
            setLoading(false);
            setError(result.error);
        }
        else {
            setLoading(false);
            if (result.length === 0) {
                setMessage('Inga produkter hittades');
            }
            setProducts(result);
        }    
    }

   

    const removeProduct = async (productId) => {
        if (window.confirm('Ta bort produkt')) {
            setError('');
            const result = await productService.deleteProduct(productId, userId, token);
            if (result.error) {
                setError(result.error);
            }
            else {
                fetchProducts();
            }
        }
        
    }



    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )



    const displayMessage = () => (
        <div className={ (message) ? 'message' : 'not-displayed' }>
            {message}
        </div>
    )



    const displayLoading = () => (
        <div className={ (loading) ? 'spinner' : 'not-displayed' }>
            {spinner}
        </div>
    );



    const setItemBackground = (index) => {
        return (index % 2 === 0) ? '' : 'shadow';
    }



    return (
        <Layout title="Produkter" menuItems={menuItems}>
            <Card title="Hantera produkter">
                {displayError()}
                {displayMessage()}
                {displayLoading()}
                <div>
                    {products.length > 0 ? (
                        <ul className="product-list">
                            {products.map((item, i) => <ListItem
                                key={item._id}
                                item={item}
                                remove={removeProduct}
                                background={setItemBackground(i)}
                            />)}
                        </ul>
                    ) : ''}
                </div>

            </Card>
        </Layout>
    )
}

export default ManageProducts;