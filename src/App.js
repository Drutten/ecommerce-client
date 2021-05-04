import { Switch, Route } from 'react-router-dom';

// import { StateProvider } from './StateContext';
import  PrivateRoute  from './shared/PrivateRoute';
import  AdminRoute  from './shared/AdminRoute';
import Home from './components/home/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/adminDashboard/AdminDashboard';
import AddCategory from './components/admin/addCategory/AddCategory';
import AddProduct from './components/admin/addProduct/AddProduct';
import Page from './components/Page';

import './App.css';

const App = () => {
  return (
    <div>
      {/* <StateProvider> */}
        <Navbar/>
        <Switch>
          <PrivateRoute exact path='/dashboard' title='Kontrollpanel' component={Dashboard}></PrivateRoute>

          <AdminRoute exact path='/admin/dashboard' title='Administratör' component={AdminDashboard}></AdminRoute>

          <AdminRoute exact path='/create/category' title='Ny kategori' component={AddCategory}></AdminRoute>

          <AdminRoute exact path='/create/product' title='Ny produkt' component={AddProduct}></AdminRoute>

          <Route exact path='/signup' render={(props) => (
            <Page title="Ny kund">
              <Signup {...props} />
            </Page>
          )}/>
          
          <Route exact path='/signin' render={(props) => (
            <Page title="Logga in">
              <Signin {...props} />
            </Page>
          )}/>

          <Route exact path='/' render={(props) => (
            <Page title="Start">
              <Home {...props} />
            </Page>
          )}/>
        </Switch>
      {/* </StateProvider> */}
    </div>
  );
}

export default App;
