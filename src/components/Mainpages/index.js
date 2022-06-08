import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Products from './Products';
import Login from './auth/Login';
import Cart from './Cart';
import Register from './auth/Register';
import NotFound from '../../utils/NotFound';
import DetailProduct from './DetailProduct';
import { GlobalState } from '../../context/GlobalState';
import History from './History';
import OrderDetails from './OrderDetails';
import Categories from './Categories';
import CreateProduct from './CreateProduct';

const Mainpages = () => {
    const state = useContext(GlobalState);
    const [isLoggged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/detail/:id" element={<DetailProduct />} />

            <Route path="/login" element={isLoggged ? <NotFound /> : <Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={isLoggged ? <NotFound /> : <Register />} />
            <Route path="/history" element={isLoggged ? <History /> : <NotFound />} />
            <Route path="/history/:id" element={isLoggged ? <OrderDetails /> : <NotFound />} />
            <Route path="/category" element={isLoggged && isAdmin ? <Categories /> : <NotFound />} />
            <Route path="/create_product" element={isLoggged && isAdmin ? <CreateProduct /> : <NotFound />} />
            <Route path="/edit_product/:id" element={isLoggged && isAdmin ? <CreateProduct /> : <NotFound />} />


            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Mainpages;