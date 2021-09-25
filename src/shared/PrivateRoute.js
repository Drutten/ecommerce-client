import { Route, Redirect } from 'react-router-dom';
import AuthService from '../services/authService';

// https://reactrouter.com/web/example/auth-workflow

const PrivateRoute = ({ children, ...rest }) => {

    const authService = new AuthService();
    
    return (
        <Route
            {...rest}
            render={({location}) =>
            authService.isAuthenticated() 
            && (authService.getLoggedInUser().user.role === 0 || authService.getLoggedInUser().user.role === 1) ? (
                children
            ) : (
                <Redirect
                to={{
                    pathname: "/signin",
                    state: { from: location }
                }}
                />
            )
            }
        />
    );
}

export default PrivateRoute;
