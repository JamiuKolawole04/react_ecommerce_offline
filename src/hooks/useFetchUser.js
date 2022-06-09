import { useState, useEffect, useCallback } from "react";

import API from "../api/ProductApi";
import axios from "../utils/axios";

const useFetchUser = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [callback, setCallback] = useState(false);


    const fetchUser = useCallback(async () => {
        try {
            const getUser = await API.fetchUser(token);
            // console.log(getUser);
            setIsLogged(true);
            getUser.role === 1 ? setIsAdmin(true) : setIsAdmin(false);


            setCart(getUser.cart);


        } catch (error) {
            console.log(error);
        }

    }, [token]);



    useEffect(() => {


        fetchUser()


    }, [fetchUser]);

    const addCart = async (product) => {
        if (!isLogged) return alert("Please login to continue buying");

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])

            await axios({
                method: "patch",
                url: "/user/addcart",
                data: {
                    cart: [...cart, { ...product, quantity: 1 }]
                },
                headers: {
                    Authorization: token
                }
            })
        } else {
            alert("This product has been added to cart")
        }
    }



    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback],
    };

}

export default useFetchUser;