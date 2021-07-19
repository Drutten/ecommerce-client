import { useState } from 'react';

import AuthService from '../../services/authService';
import DashboardCard from '../dashboardCard/DashboardCard';
import Layout from '../layout/Layout';
import './Dashboard.css';

const Dashboard = () => {

    const [menuItems] = useState([
        {id: 1, name: 'Varukorg', path: '/', icon: 'icon'},
        {id: 2, name: 'Inställningar', path: '/', icon: 'icon'}
    ]);

    const authService = new AuthService();

    const user = (authService.getLoggedInUser()) ? authService.getLoggedInUser().user : null;
    console.log(user);

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
                Historik
            </DashboardCard>
        </Layout>
    )
}

export default Dashboard;