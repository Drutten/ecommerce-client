import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/authService';
import Page from '../components/Page';

const AdminRoute = ({ component: Component, title = '', ...rest }) => {

    const authService = new AuthService();
    
    return (
        <Route
            {...rest}
            render={(props) =>
            authService.getLoggedInUser() && authService.getLoggedInUser().user.role === 1 ? (
                <Page title={title}>
                    <Component {...props}/>
                </Page>
                
            ) : (
                <Redirect
                to={{
                    pathname: "/signin",
                    state: { from: props.location }
                }}
                />
            )
            }
        />
    );
}

export default AdminRoute;