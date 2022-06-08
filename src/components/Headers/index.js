import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from '../../context/GlobalState';
import Menu from '../../asset/icon/menu.svg';
import Close from '../../asset/icon/close.svg';
import Cart from '../../asset/icon/cart.svg';
import axios from "../../utils/axios";


const Header = () => {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;
    const [menu, setMenu] = useState(false)

    const logoutUser = async () => {
        await axios({
            method: "get",
            url: "/user/logout"
        });
        localStorage.removeItem("firstLogin")
        setIsAdmin(false);
        setIsLogged(false);
        window.location.href = "/"
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        );

    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        );
    }


    const styleMenu = {
        left: menu ? 0 : "-100%",
    }


    return (
        <header className="d-flex justify-content-around align-item-center sm-justify-content-between">
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img
                    src={Menu}
                    alt=""
                    width={30}
                />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? "Admin" : "BaneAt Shop"}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                {/* <li> <Link to="/">Products</Link> </li> */}
                <li> <Link to="/">{isAdmin ? "Products" : "Shop"}</Link> </li>
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login Register</Link></li>
                }
                {/* <li> <Link to="/login">Login Register</Link> </li> */}
                <li onClick={() => setMenu(!menu)}>
                    <img
                        className="menu"
                        src={Close}
                        alt="
                     " width={30}
                    />
                </li>
            </ul>

            {
                isAdmin ? ""
                    : <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width={30} />
                        </Link>

                    </div>
            }


        </header>
    );
}

export default Header;