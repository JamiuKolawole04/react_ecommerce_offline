
import axios from '../utils/axios';

const apiSettings = {
    fetchProducts: async (page = 1, category = "", search = "", sort = "") => {
        const { data } = await axios({
            method: "get",
            url: `/api/v1/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`
        });

        return data;
    },

    fetchCategories: async () => {
        const { data } = await axios({
            method: "get",
            url: "/api/v1/category",
        });
        return data;
    },

    fetchUser: async (token) => {
        const { data } = await axios({
            method: "get",
            url: "/user/info",
            headers: {
                Authorization: token
            }
        });
        return data;
    },

    rereshToken: async () => {
        const { data } = await axios({
            method: "get",
            url: "/user/refresh_token",
            withCredentials: true
        });
        return data
    }


}


export default apiSettings