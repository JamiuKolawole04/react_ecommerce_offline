import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../context/GlobalState';

const BtnRender = ({ product, deleteProduct }) => {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;


    return (
        <div className="row__btn d-flex justify-content-between">
            {
                isAdmin ?
                    <>
                        <Link id="btn__buy" to="#!" className="ft-600" onClick={() => deleteProduct(product._id, product.images.public_id)}>Delete</Link>
                        <Link id="btn__view" className="ft-600" to={`/edit_product/${product._id}`}>Edit</Link>
                    </>
                    :
                    <>
                        <Link id="btn__buy" to="#!" className="ft-600" onClick={() => addCart(product)} >Buy</Link>
                        <Link id="btn__view" className="ft-600" to={`/detail/${product._id}`}>View</Link>
                    </>
            }


        </div>
    );
}

export default BtnRender;