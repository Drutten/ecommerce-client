import { useState } from 'react';

import AuthService from '../../../services/authService';
import DashboardCard from '../../dashboardCard/DashboardCard';
import Layout from '../../layout/Layout';
import './AdminDashboard.css';

const AdminDashboard = () => {

    

    const [menuItems] = useState([
        {id: 1, name: 'Kategorier', path: '/create/category', icon: 'icon'},
        {id: 2, name: 'Produkter', path: '/create/product', icon: 'icon'},
        {id: 3, name: 'Inställningar', path: '/', icon: 'icon'}
    ]);

    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const authService = new AuthService();
    //     if (authService.getLoggedInUser()) {
    //         console.log(authService.getLoggedInUser().user);
    //         console.log('hello');
    //         setUser(authService.getLoggedInUser().user)
    //     }
    //     return () => {console.log('Bye')}  
    // }, []);

    const authService = new AuthService();

    const user = (authService.getLoggedInUser()) ? authService.getLoggedInUser().user : null;
    console.log(user);


    return (
        <Layout title="Administratör" menuItems={menuItems}>
            <DashboardCard title="Profil">
                {user ? (
                    <ul className="profile-list">
                        <li className="profile-list-item"><span>Namn:</span><span className="value">{user.name}</span></li>
                        <li className="profile-list-item"><span>E-mail:</span><span className="value">{user.email}</span></li>
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