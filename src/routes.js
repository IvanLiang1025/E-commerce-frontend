
import React from "react";
import {Route, Switch} from "react-router-dom";
import Signin from "./user/signin.js";
import Signup from "./user/signup.js";
import UserDashboard from "./user/userDashboard";
import AdminDashboard from "./user/adminDashboard";
import PrivateRoute from "./auth/privateRoute";
import AdminRoute from "./auth/adminRoute";
import AddCategory from "./admin/addCategory";
import AddProduct from "./admin/addProduct";
import Shop from "./pages/shop/shop.js";
import Home from "./pages/home/home.js";
import Product from "./pages/product/product";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";


const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/shop" exact component={Shop}></Route>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/signin" exact component={Signin}></Route>
            <Route path="/cart" exact component={Cart}></Route>
            <Route path="/checkout" exact component={Checkout}></Route>
            <Route path="/product/:productId" exact component={Product} ></Route>
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard}></PrivateRoute>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
            <AdminRoute path="/category/create" exact component={AddCategory}></AdminRoute>
            <AdminRoute path="/product/create" exact component={AddProduct}></AdminRoute>
        </Switch>  
    );
};

export default Routes;