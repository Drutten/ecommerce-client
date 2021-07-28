import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './ListItem.css';


const ListItem = ({item, enterEditMode, remove, background}) => {
    
    const pen  =<FontAwesomeIcon icon={faPen} />
    const trash  =<FontAwesomeIcon icon={faTrash} />
  
    

    return (
        <li className={`list-item ${background}`}>
            <div>
                <span>{item.name}</span>
            </div>

            <div className="icons">
                <Link to={`/update/product/${item._id}`}>
                    <span>{pen}</span>
                </Link>
                <span className="ml-20" onClick={()=> remove(item._id)}>{trash}</span>
            </div>

        </li>
    );
}

export default ListItem;