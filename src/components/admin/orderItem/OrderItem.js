import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';

import './OrderItem.css';


const OrderItem = ({item, removeItem, updateItem, viewItem, background}) => {
    
    const trash  =<FontAwesomeIcon icon={faTrash}/>
    const pen  =<FontAwesomeIcon icon={faPen}/>
    const eye  =<FontAwesomeIcon icon={faEye}/>



    const remove = () => {}



    const update = (item) => {}



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
                <span>{pen}</span>
                <span>{trash}</span> 
            </div>
        </li>
    )
}

export default OrderItem;