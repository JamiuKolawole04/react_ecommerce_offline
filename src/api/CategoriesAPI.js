import { useState, useEffect } from "react";

import axios from "../utils/axios";

const CategoriesAPI = () => {
    const [categories, setCategories] = useState([]);
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios({
                method: "get",
                url: "/api/v1/category",
            });
            setCategories(data.category);
        }

        getCategories();
    }, [callback])

    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI;