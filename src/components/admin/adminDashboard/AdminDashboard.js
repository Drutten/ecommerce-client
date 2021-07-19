import { useState } from 'react';

import AuthService from '../../../services/authService';
import DashboardCard from '../../dashboardCard/DashboardCard';
import Layout from '../../layout/Layout';
import './AdminDashboard.css';

const AdminDashboard = () => {

    

    const [menuItems] = useState([
        {id: 1, name: 'Ordrar', path: '/orders', icon: 'icon'},
        {id: 2, name: 'Ny kategori', path: '/create/category', icon: 'icon'},
        {id: 3, name: 'Ny produkt', path: '/create/product', icon: 'icon'},
        {id: 4, name: 'Inställningar', path: '/', icon: 'icon'}
    ]);


    const authService = new AuthService();

    const user = (authService.getLoggedInUser()) ? authService.getLoggedInUser().user : null;
    console.log(user);


    return (
        <Layout title="Administratör" menuItems={menuItems}>
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

export default AdminDashboard;