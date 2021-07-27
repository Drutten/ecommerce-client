import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPen } from '@fortawesome/free-solid-svg-icons';

import AuthService from '../../services/authService';
import DashboardCard from '../dashboardCard/DashboardCard';
import Layout from '../layout/Layout';
import './Profile.css';

const Profile = (props) => {

    const authService = new AuthService();

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const spinner  = <FontAwesomeIcon icon={faSpinner} />
    const pen  = <FontAwesomeIcon icon={faPen} />
    const token = authService.getLoggedInUser().token;
    const userId = props.match.params.userId;

    const {name, password} = profile;


    const fetchUser = async (userId) => {
        setError('');
        setLoading(true);
        const result = await authService.getUser(userId, token);
        if (result.error) {
            setLoading(false);
            setError(result.error);
        }
        else {
            setLoading(false);
            setProfile({
                ...profile, 
                name: result.name,
                email: result.email
            });
        }
    }

    
    useEffect(() => {
        fetchUser(userId);
    }, []);


    const handleChange = (key, e) => {
        setProfile({...profile, [key]: e.target.value});
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await authService.updateUser(userId, token, profile);
        if (result.error) {
            setLoading(false);
            setError(result.error);
        }
        else {
            console.log(result);
            setLoading(false);
            authService.updateLoggedInUser(result, () => {
                setProfile({
                    ...profile, 
                    name: result.name
                });
                setOpen(false);
            });
            
        }
    }


    const toggleOpen = () => {
        setOpen(!open);
    }


    const getOpenClass = () => {
        if (!open) {
            return 'hidden';
        }
        return '';
    }


    const displayForm = () => (
        <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="profile-form-group">
                <label htmlFor="profile-name">Namn <span>{pen}</span></label><br />
                <input
                    type="text"
                    id="profile-name"
                    className="profile-input"
                    onChange={(e) => handleChange('name', e)}
                    value={name}
                />
            </div>
            <div className="profile-email">
                <span>Email</span>
                <span className="value">{profile.email}</span>
            </div>
            {(!open) 
            ?   <button type="button" className="profile-btn" onClick={toggleOpen}>Byt lösenord</button>
            :   <button type="button" className="profile-btn" onClick={toggleOpen}>Dölj</button>
            }
            <div className={`profile-form-group ${getOpenClass()}`}>
                <label htmlFor="profile-password">Lösenord <span>{pen}</span></label><br />
                <input
                    type="password"
                    id="profile-password"
                    className="profile-input"
                    onChange={(e) => handleChange('password', e)}
                    value={password}
                />
            </div>
            <button type="submit" className="profile-btn">Spara</button>
        </form>
    )


    const displayError = () => (
        <div className={ (error) ? 'error' : 'not-displayed' }>
            { error }
        </div>
    );


    const displayLoading = () => (
        <div className={ (loading) ? 'spinner' : 'not-displayed' }>
            {spinner}
        </div>
    );


    return (
        <Layout title="Profil" menuItems={[]}>
            <DashboardCard title="Uppdatera profil">
                {displayLoading()}
                {displayError()}
                {displayForm()}
            </DashboardCard>
        </Layout>
    )
}

export default Profile;