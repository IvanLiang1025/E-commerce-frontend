

import React, {useState, useEffect} from "react";
import Layout from "../../common/layout.js";
import {getAllCategories, getFilteredProducts, getProducts} from "../apiCore";
import CheckBox from "../../common/checkBox";
import RadioButton from "../../common/radioButton";
import Card from "../../common/card";
import prices from "./prices";

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []
        }
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [size, setSize] = useState(0);

    const init = () => {
        getAllCategories()
            .then(data => {
                if(data.error) {
                    setError(data.error);
                }else{
                    setCategories(data);
                }
            })
    }

    const loadFilteredProducts = (filters) => {
        getFilteredProducts(0, limit, filters)
            .then(data => {
                if(data.error) {
                    setError(data.error);
                }else{
                    setFilteredProducts(data.data);
                    setSize(data.size);
                    setSkip(0);
                }
            })
    }

    const loadMoreProducts = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then(data => {
                if(data.error) {
                    setError(data.error);
                }else{
                    setFilteredProducts([...filteredProducts, ...data.data]);
                    setSize(data.size);
                    setSkip(toSkip);
                }
            })
    } 

    useEffect(() => {
        init();
        loadFilteredProducts({});
    },[]);
    
    const handleFilters = (filters, filterBy) => {
        const newFilters = JSON.parse(JSON.stringify(myFilters));
        if(filterBy === "price"){
            filters = handlePrice(filters);
        }
        newFilters.filters[filterBy] = filters;
        loadFilteredProducts(newFilters.filters);
        setMyFilters(newFilters);
    }

    // transform price id to price range
    const handlePrice = (filters) => {
        const data = prices;
        for(let price of data){
            if(price._id === parseInt(filters)){
                return price.range;
            }
        }
    }

    const showNoProductsFound = () => {
        return (
            <div>No products found.</div>
        )
    }
    const LoadMoreProducts = () => (
        size > 0  &&  (
            <button style={{cursor:"pointer", display: "block", margin: "auto" }} onClick={loadMoreProducts} className="btn btn-info">Load More</button>
        ) 
    )

    return (
        <Layout title="Shop">
            <div className="container-fluid">
                <div className="row ml-5 mr-5 mb-5">
                    <div className="col-md-2">
                        <div>
                            <h3>Categories</h3>
                            <hr/>
                            <CheckBox handleFilters={(filters) => handleFilters(filters, "category")} categories={categories}></CheckBox>
                        </div>
                        <div>
                            <h3>Prices</h3>
                            <hr/>
                            <RadioButton handleFilters={(filters) => handleFilters(filters, "price")} prices={prices}></RadioButton>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="container">
                            <div className="row">
                            {
                                filteredProducts.length === 0 ? showNoProductsFound() : filteredProducts.map((product, index) => (
                                    <div key={product._id} className="col-md-4 mb-4">
                                        <Card product={product}></Card>
                                    </div>
                                    )
                                )
                            }
                                
                            </div>
                            <hr/>
                            <LoadMoreProducts></LoadMoreProducts>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop;