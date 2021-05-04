import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Layout from '../layout/Layout';
import ProductCard from '../productCard/ProductCard';
import ProductService from '../../services/productService';
import './Home.css';
import CategoryService from '../../services/categoryService';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const productService = new ProductService();
    const categoryService = new CategoryService();

    const search =<FontAwesomeIcon icon={faSearch}/>

    
    const fetchProductsByPopularity = async () => {
        setLoading(true);
        const result = await productService.getProducts('popularity');
        if (result.error) {
            setError(result.error);
            setLoading(false);
        }
        else {
            setProducts(result);
            setLoading(false);    
        }
    }

    const fetchProductsByLatest = async () => {
        setLoading(true);
        const result = await productService.getProducts('createdAt');
        if (result.error) {
            setError(result.error);
        }
        else {
            setProducts(result);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchProductsByLatest();
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            const result = await categoryService.getCategories();
            if (result.error) {
                setError(result.error);
            }
            else {
                setCategories(result);
            }
        }
        fetchCategories();
    }, []);


    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    )

    const displayLoading = () => (
        <div className={ (loading) ? 'spinner' : 'not-displayed' }>
            Laddar...
        </div>
    );
    
    return (
        
        <Layout title="Lilla Butiken" categories={categories}>
            <div className="controls">
                <h4>Sortering</h4>
                <div className="control-buttons">
                    <button onClick={fetchProductsByLatest}>Nyheter</button>
                    <button onClick={fetchProductsByPopularity}>Bästsäljare</button>
                </div>
                
                <form>
                    <input type="text" placeholder="Sök"></input>
                    <button>{search}</button>
                </form>
            </div>

            {displayLoading()}
            {displayError()}
            
            <div className="product-wrapper">
                {products && products.map(p => 
                    <ProductCard key={p._id} product={p}></ProductCard>
                )}
            </div>
        </Layout>
    )
}

export default Home;