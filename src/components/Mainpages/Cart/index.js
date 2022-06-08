import React, { useContext, useEffect, useState } from "react";
import axios from "../../../utils/axios"

import { GlobalState } from "../../../context/GlobalState";
import PaypalButton from "./PaypalButton";

const Cart = () => {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token
    const [total, setTotal] = useState(0);
    const [callback, setCallback] = state.userAPI.callback

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }

        getTotal()

    }, [cart])

    const addToCart = async (cart) => {
        await axios({
            method: "patch",
            url: "/user/addcart",
            data: { cart },
            headers: {
                Authorization: token
            }
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = (id) => {
        if (window.confirm("Do you want to delete this product")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async (payment) => {
        const { paymentID, address } = payment;
        await axios({
            method: "post",
            url: "/api/v1/payment",
            data: { cart, paymentID, address },
            headers: {
                Authorization: token
            }
        });


        setCart([])
        addToCart([])
        console.log(cart)
        alert("You have successfully placed an order.");
        setCallback(!callback)
    }

    if (cart.length === 0) return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty </h2>
    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail d-flex justify-content-around cart" key={product._id}>
                        <img
                            className="img__container"
                            src={product.images.url}
                            alt=""
                        />

                        {/* // d-flex justify-content-between align-item-center */}
                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>${product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>

                            <div
                                className="delete"
                                onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))

            }
            <div className="total d-flex align-item-center justify-content-between">
                <h3>Total : $ {total}</h3>
                {/* <Link to="#!">Payment</Link> */}
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess}
                />
            </div>
        </div>
    );
}

export default Cart;