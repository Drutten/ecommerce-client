import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Layout from '../layout/Layout';
import ProductCard from '../productCard/ProductCard';
import ProductService from '../../services/productService';
import './Home.css';
import CategoryService from '../../services/categoryService';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState('createdAt');
    const [currentCategory, setCurrentCategory] = useState('');
    const [searchText, setSearchText] = useState('');

    const productService = new ProductService();
    const categoryService = new CategoryService();

    const search =<FontAwesomeIcon icon={faSearch}/>
    const spinner =<FontAwesomeIcon icon={faSpinner}/>

    

    const fetchProductsBySort = async (sortValue = sort) => {
        let result;
        prepareFetch();
        if (currentCategory) {
            result = await productService.getProductsByCategory(sortValue, currentCategory);    
        }
        else{
            result = await productService.getProducts(sortValue);
        }
        if (result.error) {
            endFetchWithError(result.error);
        }
        else {
            endFetchWithSuccess(result);
            setSort(sortValue);   
        }  
    }



    const fetchProductsByCategory = async (category) => {
        prepareFetch();
        const result = await productService.getProductsByCategory(sort, category);
        if (result.error) {
            endFetchWithError(result.error);
        }
        else {
            endFetchWithSuccess(result);
            setCurrentCategory(category);
        }
    }



    const fetchProductsBySearch = async () => {
        const queryParams = {};
        if (searchText) queryParams.search = searchText;
        if (sort) {
            queryParams.sort = sort;
            queryParams.order = 'desc';
        }
        prepareFetch();
        const result = await productService.getProductsBySearch(queryParams);
        if (result.error) {
            endFetchWithError(result.error);
        }
        else {
            endFetchWithSuccess(result);
            setCurrentCategory('');
        }
    }



    const fetchAll = async () => {
        prepareFetch();
        const result = await productService.getProducts(sort);
    
        if (result.error) {
            endFetchWithError(result.error);
        }
        else {
            endFetchWithSuccess(result);
            setCurrentCategory(''); 
        }
    }



    const prepareFetch = () => {
        setError('');
        setMessage('');
        setLoading(true);
    }



    const endFetchWithError = (err) => {
        setLoading(false);
        setError(err);
    }



    const endFetchWithSuccess = (result) => {
        setLoading(false);
        if (result.length === 0) {
            setMessage('Inga produkter matchade din sökning');
        }
        setProducts(result); 
    }



    useEffect(() => {
        fetchProductsBySort('createdAt');
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



    const handleChangeSearch = (event) => {
        setSearchText(event.target.value);
    }



    const handleSubmitSearch = (event) => {
        event.preventDefault();
        fetchProductsBySearch(categories[0]);
        setSearchText('');
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
    
    

    return (
        
        <Layout 
            title="Lilla Butiken" 
            categories={categories} 
            onFetchByCategory={fetchProductsByCategory} 
            onFetchAll={fetchAll}
        >
            <div className="controls">
                <div className="control-buttons">
                    <button onClick={() => fetchProductsBySort('createdAt')}>Nyheter</button>
                    <button onClick={() => fetchProductsBySort('popularity')}>Bästsäljare</button>
                </div>
                
                <form onSubmit={(e) => handleSubmitSearch(e)}>
                    <input type="text" placeholder="Sök" value={searchText} onChange={(e) => handleChangeSearch(e)}></input>
                    <button type="submit">{search}</button>
                </form>
            </div>

            {displayError()}
            {displayMessage()}
            
            <div className="product-wrapper">
                {displayLoading()}
                {products && products.map(p => 
                    <ProductCard key={p._id} product={p}></ProductCard>
                )}
                <div className="empty-space"></div>
                <div className="empty-space"></div>
                <div className="empty-space"></div>
                
            </div>
            
        </Layout>
    )
}

export default Home;