import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";

import ProductItem from "../../ProductItem";
import { GlobalState } from "../../../context/GlobalState";

const DetailProduct = () => {
    const params = useParams();
    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart
    const [products] = state.ProductAPI.products
    const [detailProducts, setDetailProducts] = useState([]);


    useEffect(() => {
        if (params.id) {
            products.forEach((product) => {
                if (product._id === params.id) setDetailProducts(product)
            })
        }
    }, [params.id, products]);

    if (detailProducts.length === 0) return null;

    return (
        <>
            <div className="detail d-flex justify-content-around">
                <img
                    src={detailProducts.images.url}
                    alt=""
                />

                <div className="box-detail">
                    <div className="row d-flex justify-content-between align-item-center">
                        <h2>{detailProducts.title}</h2>
                        <h6>#id: {detailProducts.product_id}</h6>
                    </div>
                    <span>${detailProducts.price}</span>
                    <p>{detailProducts.description}</p>
                    <p>{detailProducts.content}</p>
                    <p>Sold: {detailProducts.sold}</p>

                    <Link to="" onClick={() => addCart(detailProducts)} className="cart">Buy Now</Link>
                </div>
            </div>

            <div>
                <h2>Realted products</h2>
                <div className="products d-grid justify-items-center">
                    {
                        products.map((product) => (
                            product.category === detailProducts.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        ))
                    }
                </div>

            </div>

        </>

    );
}

export default DetailProduct;