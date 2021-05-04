import './ProductImage.css';

const ProductImage = ({product, url}) => {
    return (
        <div className="product-img">
            <img 
                src={`${process.env.REACT_APP_API_URL}/${url}/image/${product._id}`}
                alt={product.name}
            />
        </div>
    )
}

export default ProductImage;