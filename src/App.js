import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StateProvider } from './StateContext';
import PrivateRoute from './shared/PrivateRoute';
import AdminRoute from './shared/AdminRoute';
import Home from './components/home/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import Admin from './components/admin/Admin';
import AddCategory from './components/admin/addCategory/AddCategory';
import AddProduct from './components/admin/addProduct/AddProduct';
import ManageProducts from './components/admin/manageProducts/ManageProducts';
import Product from './components/product/Product';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import EditProfile from './components/editProfile/EditProfile';
import Orders from './components/admin/orders/Orders';
import EditProduct from './components/admin/editProduct/EditProduct';

import './App.css';

const App = () => (

  <div>
    <StateProvider>
      <Navbar />
      <Switch>

        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>

        <AdminRoute exact path="/orders">
          <Orders />
        </AdminRoute>

        <AdminRoute exact path="/create/category">
          <AddCategory />
        </AdminRoute>

        <AdminRoute exact path="/create/product">
          <AddProduct />
        </AdminRoute>

        <AdminRoute exact path="/update/product/:productId">
          <EditProduct />
        </AdminRoute>

        <AdminRoute exact path="/admin/products">
          <ManageProducts />
        </AdminRoute>

        <AdminRoute exact path="/admin">
          <Admin />
        </AdminRoute>

        <Route exact path="/signup"><Signup /></Route>

        <Route exact path="/signin"><Signin /></Route>

        <Route exact path="/cart"><Cart /></Route>

        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>

        <PrivateRoute exact path="/edit-profile/:userId" >
          <EditProfile />
        </PrivateRoute>
        
        <Route exact path="/products/:productId"><Product /></Route>

        <Route exact path="/"><Home /></Route>

      </Switch>
    </StateProvider>
  </div>
);

export default App;
