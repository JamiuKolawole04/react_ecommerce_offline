import React, { createContext, useEffect, useState } from "react";

import ProductApi from "../api/ProductApi";
import axios from "../utils/axios";
import UserAPI from "../api/UserAPI";
import CategoriesAPI from "../api/CategoriesAPI";

const GlobalState = createContext();

const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);



    useEffect(() => {
        // const firstLogin = localStorage.getItem("firstLogin");
        const firstLogin = JSON.parse(localStorage.getItem("firstLogin"));
        console.log(firstLogin);

        if (firstLogin) {
            const refreshToken = async () => {
                const { data } = await axios({
                    method: "get",
                    url: "/user/refresh_token",
                    withCredentials: true
                });
                setToken(data.accessToken)

            }
            refreshToken()
        }


    }, [setToken]);


    const state = {
        token: [token, setToken],
        ProductAPI: ProductApi(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }


    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}

export { GlobalState, DataProvider }