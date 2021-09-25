import { useEffect } from 'react';
import AuthService from '../../services/authService';
import History from '../history/History';
import Card from '../card/Card';
import Layout from '../layout/Layout';
import './Profile.css';

const Profile = () => {

    const authService = new AuthService();

    const user = authService.getLoggedInUser().user;
    const token = authService.getLoggedInUser().token;

    const menuItems = [];


    useEffect(() => {
        document.title = 'Profil';
    }, []);

    
    return (
        <Layout title="Profil" menuItems={menuItems}>
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

export default Profile;