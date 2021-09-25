import { useState, useEffect } from 'react';

import AuthService from '../../services/authService';
import Card from '../card/Card';
import Layout from '../layout/Layout';
import History from '../history/History';
import './Admin.css';

const Admin = () => {

    const authService = new AuthService();

    const user = authService.getLoggedInUser().user;
    const token = authService.getLoggedInUser().token;

    const [menuItems] = useState([
        {id: 1, name: 'Ordrar', path: '/orders'},
        {id: 2, name: 'Ny kategori', path: '/create/category'},
        {id: 3, name: 'Ny produkt', path: '/create/product'},
        {id: 4, name: 'Produkter', path: '/admin/products'}
    ]);



    useEffect(() => {
        document.title = 'Administratör';
    }, []);



    return (
        <Layout title="Administratör" menuItems={menuItems}>
            <Card title="Profil">
                {user ? (
                    <ul className="profile-list">
                        <li className="profile-list-item"><span>Namn:</span><span className="value">{user.name}</span></li>
                        <li className="profile-list-item"><span>Email:</span><span className="value">{user.email}</span></li>
                        <li className="profile-list-item"><span>Kontotyp:</span><span className="value">{user.role === 1 ? 'Admin' : 'Medlem'}</span></li>
                    </ul>
                ) : ''
            }
            </Card>

            <Card title="Historik">
                <History user={user} token={token} />
            </Card>
        </Layout>
    )
}

export default Admin;