import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import 'moment-timezone';

import './OrderDetails.css';


const OrderDetails = ({item, removeItem, updateItem}) => {
    
    const trash  =<FontAwesomeIcon icon={faTrash}/>
    const pen  =<FontAwesomeIcon icon={faPen}/>



    const remove = () => {}



    const update = (item) => {}


    const displayOrderInfo = (key, value) => (
        <div className="order-info">
            <span>{key}</span>
            <span>{value}</span>
        </div>
    )


    const displayProductInfo = (key, value) => (
        <div className="order-product">
            <div>{key}</div>
            <div> {value}</div>
        </div>
    )
  
    

    return (
        <div>
            <div className="order-info-buttons">
                <button>Ändra</button>
                <button>Ta bort</button>
            </div>
            <div>
                <h2 className="order-info-header">
                    <span>Orderid: </span>
                    <span>{item._id}</span>
                </h2>
                {displayOrderInfo('Status:', item.status)}
                <div className="order-info">
                    <span>Skapad: </span>
                    <Moment fromNow>{item.createdAt}</Moment>
                </div>
                <div className="order-info">
                    <span>Senast uppdaterad: </span>
                    <Moment fromNow>{item.updatedAt}</Moment>
                </div>
                {displayOrderInfo('Transaktionsid:', item.transaction_id)}
                {displayOrderInfo('Totalt:', item.amount + ' SEK')}
                {displayOrderInfo('Kund:', item.user.name)}
                {displayOrderInfo('Levereras till:', item.address)}
            </div>
            <div>
                <ul>
                    {(item.products && item.products.length > 0) && item.products.map((product, i) => (
                        <li key={i}>
                            {displayProductInfo('Produkt', product.name)}
                            {displayProductInfo('Id', product._id)}
                            {displayProductInfo('Styckpris', product.price + ' SEK')}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="order-info-buttons">
                <button>Ändra</button>
                <button>Ta bort</button>
            </div>
        </div>
    )
}

export default OrderDetails;