import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';

import './OrderItem.css';


const OrderItem = ({item, enterEditMode, viewItem, background}) => {
    
    const pen  =<FontAwesomeIcon icon={faPen}/>
    const eye  =<FontAwesomeIcon icon={faEye}/>



    const view = () => {
        viewItem(item);
    }
  
    

    return (
        <li className={`order-item ${background}`}>
            <div>
                { (item.status === 'Ny') ? <span className="new item-start"></span> : <span className="item-start"></span>}
                <span>{item._id}</span>
            </div>

            <div className="icons">
                <span onClick={view}>{eye}</span>
                <span onClick={()=> enterEditMode(item)}>{pen}</span> 
            </div>
        </li>
    )
}

export default OrderItem;