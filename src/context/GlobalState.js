import React, { createContext } from "react";

import useFetchProduct from "../hooks/useFetchProduct";
import useCategoryFetch from "../hooks/useFetchCategories";
import useFetchUser from "../hooks/useFetchUser";
import API from "../api/ProductApi";

const GlobalState = createContext();

const DataProvider = ({ children }) => {

    // const [token, setToken] = useState("");

    const firstLogin = JSON.parse(localStorage.getItem("firstLogin"));
    let token = localStorage.getItem("token");


    if (firstLogin) {
        const fetchToken = async () => {
            const getToken = await API.rereshToken();
            return getToken
        }


        (async () => {
            let token = await fetchToken();
            localStorage.setItem("token", token.accessToken)
        })()
    }




    const state = {

        token: [token],
        ProductAPI: useFetchProduct(),
        useFetchUser: useFetchUser(token),
        // userAPI: UserAPI(token),
        categoriesAPI: useCategoryFetch()
    }







    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}

export { GlobalState, DataProvider }