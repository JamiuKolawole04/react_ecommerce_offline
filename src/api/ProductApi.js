import { useState, useEffect } from 'react';
import axios from '../utils/axios';


const ProductApi = () => {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);

    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    const getProducts = async () => {
        const { data } = await axios({
            method: "get",
            url: `/api/v1/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`
        })
        setProducts(data.products);
        setResult(data.result);

    }


    useEffect(() => {

        getProducts()
    }, [page, category, sort, search]);


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



export default ProductApi;