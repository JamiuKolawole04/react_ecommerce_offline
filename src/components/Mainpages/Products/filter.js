import { useContext } from "react";

import { GlobalState } from "../../../context/GlobalState";

const Filters = () => {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [category, setCategory] = state.ProductAPI.category;
    const [search, setSearch] = state.ProductAPI.search;
    const [sort, setSort] = state.ProductAPI.sort;

    const handleCategory = e => {
        setCategory(e.target.value);
        setSearch("");
    }


    return (
        <div className="filter_menu d-flex justify-content-between align-item-center">
            <div className="row">
                <span>Filters: </span>
                <select name="category" id="category" value={category} onChange={handleCategory}>
                    <option value="">All Products</option>
                    {
                        categories.map((category) => (
                            <option value={"category=" + category.name} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <input type="text" value={search} placeholder="Enter your search!" onChange={({ target }) => setSearch(target.value.toLocaleLowerCase())} />

            <div className="row sort">
                <span>Sort By: </span>
                <select name="sort" id="sort" value={sort} onChange={({ target }) => setSort(target.value)}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best sales</option>
                    <option value="sort=-price">Price: High-Low</option>
                    <option value="sort=price">Price: Low-High</option>
                </select>
            </div>
        </div>
    );

}

export default Filters;