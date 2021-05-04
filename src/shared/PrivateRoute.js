import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/authService';
import Page from '../components/Page';

const PrivateRoute = ({ component: Component, title = '', ...rest }) => {

    const authService = new AuthService();
    
    return (
        <Route
            {...rest}
            render={(props) =>
            authService.isAuthenticated() && authService.getLoggedInUser().user.role === 0 ? (
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

export default PrivateRoute;
