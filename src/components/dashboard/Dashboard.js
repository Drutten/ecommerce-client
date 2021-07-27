import AuthService from '../../services/authService';
import History from '../history/History';
import DashboardCard from '../dashboardCard/DashboardCard';
import Layout from '../layout/Layout';
import './Dashboard.css';

const Dashboard = () => {

    const authService = new AuthService();

    const user = authService.getLoggedInUser().user;
    const token = authService.getLoggedInUser().token;

    const menuItems = [];

    
    return (
        <Layout title="Kontrollpanel" menuItems={menuItems}>
            <DashboardCard title="Profil">
                {user ? (
                    <ul className="profile-list">
                        <li className="profile-list-item"><span>Namn:</span><span className="value">{user.name}</span></li>
                        <li className="profile-list-item"><span>Email:</span><span className="value">{user.email}</span></li>
                        <li className="profile-list-item"><span>Kontotyp:</span><span className="value">{user.role === 1 ? 'Admin' : 'Medlem'}</span></li>
                    </ul>
                ) : ''
            }
            </DashboardCard>

            <DashboardCard title="Historik">
                <History user={user} token={token} />
            </DashboardCard>
        </Layout>
    )
}

export default Dashboard;