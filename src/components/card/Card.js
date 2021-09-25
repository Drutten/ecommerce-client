import './Card.css';

const Card = ({
    title = 'Rubrik',
    children
}) => {

    
    return (
        <div className="card">
            <header>
                <h3>{title}</h3>
            </header>
            
            <div>{children}</div>
        </div>
    )
}

export default Card;