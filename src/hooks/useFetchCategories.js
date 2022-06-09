import { useEffect, useState } from "react";

import API from '../api/ProductApi';

const useCategoryFetch = () => {
    const [categories, setCategories] = useState([]);
    const [callback, setCallback] = useState(false)

    const fetchCategory = async () => {
        try {
            const getCategories = await API.fetchCategories();
            setCategories(getCategories.category);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        fetchCategory();

    }, [callback]);

    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default useCategoryFetch;