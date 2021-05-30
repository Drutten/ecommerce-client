import { useEffect, useState } from 'react';

import ProductService from '../../services/productService';
import Layout from '../layout/Layout';
import './Product.css';

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [message, setMessage] = useState('');
    const productId = props.match.params.productId;
    

    useEffect(() => {
        const fetchProduct = async () => {
            const productService = new ProductService();
            
            setLoading(true);
            const result = await productService.getProduct(productId);
            if (result.error) {
                setError(result.error);
            }
            else {
                setProduct(result);
            }
        }    
    }, [productId]);
    


    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )


    // const displayMessage = () => (
    //     <div className={ (message) ? 'message' : 'not-displayed' }>
    //         {message}
    //     </div>
    // )


    const displayLoading = () => (
        <div className={ (loading) ? 'spinner' : 'not-displayed' }>
            Laddar...
        </div>
    );


    return (
        <Layout title="Lilla Butiken">
            {displayLoading()}
            {displayError()}
            <div>

            </div>    
        </Layout>
    )
}

export default Product;