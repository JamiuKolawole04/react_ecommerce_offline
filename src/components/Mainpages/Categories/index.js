import { useState, useContext } from "react";

import { GlobalState } from "../../../context/GlobalState";
import axios from "../../../utils/axios"

const Categories = () => {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [token] = state.token;
    const [callback, setCallback] = state.categoriesAPI.callback
    const [category, setCategory] = useState("");
    const [onEdit, setOnEdit] = useState(false);
    const [iD, setID] = useState("")

    const createCategory = async event => {
        event.preventDefault();
        if (onEdit) {
            try {
                const { data } = await axios({
                    method: "put",
                    url: `/api/v1/category/${iD}`,
                    data: {
                        name: category.toLocaleLowerCase()
                    },
                    headers: {
                        Authorization: token
                    }
                })
                setOnEdit(false)
                setCategory("")
                setCallback(!callback)
                alert(data.msg);

            } catch (err) {
                alert(err.response.data.msg)
            }

        } else {
            try {
                const { data } = await axios({
                    method: "post",
                    url: "/api/v1/category",
                    data: {
                        name: category.toLocaleLowerCase()
                    },
                    headers: {
                        Authorization: token
                    }
                })
                setOnEdit(false)
                setCategory("")
                setCallback(!callback)
                alert(data.msg);

            } catch (err) {
                alert(err.response.data.msg)
            }
        }


    }

    const editCategory = async (id, name) => {
        setID(id);
        setCategory(name);
        setOnEdit(true);
    }

    const deleteCategory = async id => {
        try {
            const { data } = await axios({
                method: "delete",
                url: `/api/v1/category/${id}`,
                headers: {
                    Authorization: token
                }
            })
            alert(data.msg);
            setCallback(!callback);

        } catch (err) {
            alert(err.response.data.msg)

        }
    }

    return (
        <div className="categories d-flex justify-content-around align-item-center">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    name="category"
                    value={category}
                    required
                    onChange={({ target }) => setCategory(target.value)}
                />

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row d-flex justify-content-between align-item-center" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Categories