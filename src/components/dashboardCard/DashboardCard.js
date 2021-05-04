import './DashboardCard.css';

const DashboardCard = ({
    title = 'Rubrik',
    children
}) => {

    
    return (
        <div className="dashboard-card">
            <header>
                <h3>{title}</h3>
            </header>
            
            <div>{children}</div>
        </div>
    )
}

export default DashboardCard;