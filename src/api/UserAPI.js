import { useState, useEffect } from "react";

import axios from "../utils/axios";

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const { data } = await axios({
                        method: "get",
                        url: "/user/info",
                        headers: {
                            Authorization: token
                        }
                    })
                    setIsLogged(true);
                    data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    setCart(data.cart);

                } catch (err) {
                    alert(err)
                }
            }

            getUser();
        }
    }, [token]);

    // useEffect(() => {
    //     if (token) {
    //         const getHistory = async () => {
    //             if (isAdmin) {
    //                 const { data } = await axios({
    //                     method: "get",
    //                     url: "/api/v1/payment",
    //                     headers: {
    //                         Authorization: token
    //                     }
    //                 })
    //                 setHistory(data.payments);
    //             } else {
    //                 const { data } = await axios({
    //                     method: "get",
    //                     url: "/user/history",
    //                     headers: {
    //                         Authorization: token
    //                     }
    //                 })
    //                 setHistory(data.history);
    //             }

    //         }

    //         getHistory();
    //     }
    // }, [token, callback, isAdmin])

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
        callback: [callback, setCallback]
    };
}

export default UserAPI;