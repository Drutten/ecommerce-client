import Moment from 'react-moment';
import 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import './EditOrder.css';

const EditOrder = ({item, statusOptions, updateStatus, removeItem, backToList}) => {
    
    const trash  =<FontAwesomeIcon icon={faTrash} />
    const back  =<FontAwesomeIcon icon={faChevronLeft} />


    const remove = () => {
        if (window.confirm('Ta bort order')) {
            removeItem(item._id);
        }
    }


    const handleStatusChange = (e, orderId) => {
        updateStatus(e.target.value, orderId);
    }


    const displayOrderInfo = (key, value) => (
        <div className="order-info">
            <span>{key}</span>
            <span>{value}</span>
        </div>
    )


    const displayProductInfo = (key, value) => (
        <div className="order-product">
            <span>{key}</span>
            <span> {value}</span>
        </div>
    )


    const displayButtons = () => (
        <div className="order-info-buttons">
            <button onClick={backToList}>{back} Tillbaka</button>
            <button onClick={remove}>{trash} Ta bort</button>
        </div>    
    )


    const displayEditStatus = () => {
        if (statusOptions.length > 0) {
            return(
            <div className="edit-status-form">
                <label htmlFor="select-status">Status: {item.status}</label><br />
                <select id="select-status" onChange={(e) => handleStatusChange(e, item._id) }>
                    <option>Ändra status</option>
                    {statusOptions.map((status, i) => (
                        <option key={i} value={status}>{status}</option>
                    ))}
                </select>
            </div>   
            )
        }
    }
  
    

    return (
        <div>
            {displayButtons()}
            <div className="order-info-container">
                <h2 className="order-info-header">
                    <span>Orderid: </span>
                    <span>{item._id}</span>
                </h2>
                {displayEditStatus()}
                <div className="order-info">
                    <span>Skapad: </span>
                    <Moment fromNow>{item.createdAt}</Moment>
                </div>
                <div className="order-info">
                    <span>Senast uppdaterad: </span>
                    <Moment fromNow>{item.updatedAt}</Moment>
                </div>
                {displayOrderInfo('Transaktionsid: ', item.transaction_id)}
                {displayOrderInfo('Totalt: ', item.amount + ' SEK')}
                {displayOrderInfo('Kund: ', item.user.name)}
                {displayOrderInfo('Levereras till: ', item.address)}
            </div>
            <div>
                <ul className="order-product-list">
                    {(item.products && item.products.length > 0) && item.products.map((product, i) => (
                        <li key={i}>
                            {displayProductInfo('Produkt: ', product.name)}
                            {displayProductInfo('Id: ', product._id)}
                            {displayProductInfo('Styckpris: ', product.price + ' SEK')}
                            {displayProductInfo('Antal: ', product.amount)}
                        </li>
                    ))}
                </ul>
            </div>
            {displayButtons()}
        </div>
    )
}

export default EditOrder;