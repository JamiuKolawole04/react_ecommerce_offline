import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductItem from '../../ProductItem';
import { GlobalState } from '../../../context/GlobalState';
import Loading from '../../../utils/Loading';
import axios from "../../../utils/axios";
import Filters from './filter';
import LoadMore from './loadMore';

const Products = () => {
    const navigate = useNavigate();

    const state = useContext(GlobalState);
    const [products, setProducts] = state.ProductAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.ProductAPI.callback;
    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const checkAll = () => {
        products.forEach((product) => {
            product.checked = !isCheck

        });
        setProducts([...products]);
        setIsCheck(!isCheck)
    }

    const handleCheck = (id) => {
        products.forEach((product) => {
            if (product._id === id) product.checked = !product.checked
        });
        setProducts([...products]);
    }

    const deleteAll = () => {
        products.forEach((product) => {
            if (product.checked) deleteProduct(product._id, product.images.public_id);
        });
    }

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true)
            await axios(({
                method: "post",
                url: `/api/v1/destroy`,
                data: { public_id },
                headers: {
                    Authorization: token
                }
            }));
            await axios({
                method: "delete",
                url: `/api/v1/products/${id}`,
                headers: {
                    Authorization: token
                }
            });
            setCallback(!callback);
            setLoading(false);


        } catch (err) {
            alert(err.response.data.msg);
            navigate("/");
            // window.location.href = "/";

        }
    }

    if (loading) return <div><Loading /> </div>



    return (
        <>
            <Filters />
            {
                isAdmin &&
                <div className="delete-all">
                    <span>Select all</span>
                    <input
                        type="checkbox"
                        checked={isCheck}
                        onChange={checkAll}
                    />
                    <button onClick={deleteAll}>Delete All</button>
                </div>
            }
            <div className='products d-grid justify-items-center'>
                {
                    products.map((product) => (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                            deleteProduct={deleteProduct}
                            handleCheck={handleCheck}
                        />
                    ))
                }
            </div>

            <LoadMore />
            {products.length === 0 && <Loading />}
        </>
    );
}


export default Products;