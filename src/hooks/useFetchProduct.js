import { useCallback, useEffect, useState } from "react";

import API from "../api/ProductApi";


const useFetchProduct = () => {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);

    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);


    const fetchProducts = useCallback(async () => {
        try {
            const getProducts = await API.fetchProducts(page, category, search, sort);
            setProducts(getProducts.products);
            setResult(getProducts.result);
        } catch (error) {
            alert(error);

        }

    }, [page, category, search, sort]);

    useEffect(() => {

        fetchProducts();

    }, [callback, fetchProducts]);

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        search: [search, setSearch],
        sort: [sort, setSort],
        page: [page, setPage],
        result: [result, setResult]
    };
}

export default useFetchProduct