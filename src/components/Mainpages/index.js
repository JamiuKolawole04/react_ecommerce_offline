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
    const [isLogged, isAdmin] = state.useFetchUser.isLogged;



    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/detail/:id" element={<DetailProduct />} />

            <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={isLogged ? <NotFound /> : <Register />} />
            <Route path="/history" element={isLogged ? <History /> : <NotFound />} />
            <Route path="/history/:id" element={isLogged ? <OrderDetails /> : <NotFound />} />
            <Route path="/category" element={isLogged && isAdmin ? <Categories /> : <NotFound />} />
            <Route path="/create_product" element={isLogged && isAdmin ? <CreateProduct /> : <NotFound />} />
            <Route path="/edit_product/:id" element={isLogged && isAdmin ? <CreateProduct /> : <NotFound />} />


            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Mainpages;