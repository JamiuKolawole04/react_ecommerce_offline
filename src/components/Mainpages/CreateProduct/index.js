import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../../../utils/axios";
import { GlobalState } from "../../../context/GlobalState";
import Loading from "../../../utils/Loading";

const CreateProduct = () => {

    const initialState = {
        product_id: "",
        title: "",
        price: 0,
        description: "Description goes here type",
        content: "Product content goes here typed",
        category: "",
        _id: ""
    }

    const navigate = useNavigate();
    const param = useParams();

    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [isAdmin] = state.userAPI.isAdmin;
    const [callback, setCallback] = state.ProductAPI.callback;
    const [products] = state.ProductAPI.products
    const [token] = state.token;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onEdit, setOnEdit] = useState(false);


    useEffect(() => {
        if (param.id) {
            setOnEdit(true);
            products.forEach((product) => {
                if (product._id === param.id) {
                    setProduct(product);
                    setImages(product.images)
                }
            })

        } else {
            setOnEdit(false)
            // setProduct(initialState);
            setImages(false);
        }
    }, [param.id, products])

    const handleUpload = async event => {
        event.preventDefault();
        try {
            if (!isAdmin) return alert("You are not an admin");
            const file = event.target.files[0];

            if (!file) return alert("File does not exist.");

            // file bigger than 1mb
            if (file.size > 1024 * 1024) return alert("Size too large!");

            if (file.type !== "image/png" && file.type !== "image/jpeg") return alert("File format is incorrect");

            let formData = new FormData()
            formData.append("file", file);

            setLoading(true);
            const { data } = await axios({
                "method": "post",
                url: "api/v1/upload",
                data: formData,
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: token
                }
            });
            setLoading(false);
            setImages(data);
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) alert("You are not an admin");
            setLoading(true)
            await axios({
                method: "post",
                url: "/api/v1/destroy",
                data: {
                    public_id: images.public_id
                },
                headers: {
                    Authorization: token
                }
            });
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.message)
        }

    }

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert("You are not an admin");
            if (!images) return alert("No image uploaded");

            if (onEdit) {
                await axios({
                    method: "put",
                    url: `/api/v1/products/${product._id}`,
                    data: {
                        ...product,
                        images
                    },
                    headers: {
                        Authorization: token
                    }
                });

            } else {
                await axios({
                    method: "post",
                    url: "/api/v1/products",
                    data: {
                        ...product,
                        images
                    },
                    headers: {
                        Authorization: token
                    }
                });

            }



            setImages(false);
            setProduct(initialState);
            setCallback(!callback)
            navigate("/");

        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const styleUpload = {
        display: images ? "block" : "none",
    }

    return (
        <div className="create_product d-flex justify-content-around align-item-center">
            <div className="upload">
                <div className="plus">+</div>
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>
                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ""} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }

            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        value={product.product_id}
                        required
                        onChange={handleChangeInput}
                        disabled={onEdit}
                    />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={product.title}
                        required
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        required
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={product.description}
                        required
                        rows={5}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea
                        type="text"
                        name="content"
                        id="content"
                        value={product.content}
                        required
                        rows={7}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} required>
                        <option value="">Please select a category</option>
                        {
                            categories.map((category) => (
                                <option value={category._name} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>

                </div>

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    );
}

export default CreateProduct;