import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
// import { faNotEqual } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import ProductImage from '../productImage/ProductImage';
import './ProductCard.css';

const ProductCard = ({product}) => {

    const cartPlus =<FontAwesomeIcon icon={faCartPlus}/>
    // const notEqual =<FontAwesomeIcon icon={faNotEqual}/>
    // const solidHeart =<FontAwesomeIcon icon={fasHeart}/>
    const regularHeart =<FontAwesomeIcon icon={farHeart}/>

    
    return (
        <div className="product-card">
            <div className="product-content">
                <div className="image">
                    <ProductImage product={product} url="products"/>   
                </div>

                <div className="product-card-body">

                    <div className="info">
                        <div className="product-card-title">
                            <h3>{product.name}</h3>
                            <span>{product.category.name}</span>
                        </div>

                        <div className="product-card-info">
                            <span><b>{product.price}</b> SEK</span>
                            <span>{product.quantity} i lager</span>
                            <div className="buttons">
                                <button title="Lägg i varukorgen"><span>{cartPlus}</span></button>
                                {/* <button title="Ta bort från varukorgen"><span>{notEqual}</span></button> */}
                            </div>

                        </div>  
                    </div>    
                </div>
            </div>

            <div className="extra">
                {(product.quantity < 10) ? (<span className="warning">Få kvar</span>) 
                : (<span></span>)}
                <span>{regularHeart}</span>
                {/* <span>{solidHeart}</span> */}
            </div>   
        </div>
    )
}

export default ProductCard;