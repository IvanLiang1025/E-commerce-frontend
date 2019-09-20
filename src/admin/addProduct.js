

import React, {useState, useEffect} from "react";
import Layout from "../common/layout";
import {createProduct, getAllCategories} from "./apiAdmin";
import {isAuthenticated } from "../auth/index";
import {Link} from "react-router-dom";


const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        categories: [],
        category: "",
        photo: "",
        error: "",
        success: false,
        createdProduct: "",
        formData: ""
    })

    const {name, description, price, quantity, categories, category, error, success, createdProduct, formData} = values;
    const {user, token} = isAuthenticated();

    const init = () => {
        getAllCategories()
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error});
                }else{
                    setValues({...values, categories: data, formData: new FormData()});
                }
            })
    }

    useEffect(() => {
        console.log("useEffect");
        init();
    },[]);

    const handleChange = (name, event) => {
        const value = (name === "photo" ? event.target.files[0] : event.target.value);
        
        formData.set(name, value);
        setValues({...values, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", success: false});
        for(const key of formData.keys()){
            console.log(formData.get(key));
        }
        createProduct(user._id, token, formData)
            .then(data => {
                if(data.error){
                    setValues({
                        ...values, 
                        error: data.error, 
                        success: false
                    });
                }else{
                    setValues({
                        ...values, 
                        photo: "",
                        category: "",
                        name: "",
                        description: "",
                        price: "",
                        quantity: "",
                        success: true,
                        error: "",
                        createdProduct: data,
                        formData: new FormData()
                    })
                }
            }) 
    }

    const newProductForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="#photo-input">Photo:</label>
                    <input onChange={(event => handleChange("photo", event))} id="photo-input" type="file" name="photo" accept="image/*" className="form-control">

                    </input>
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select onChange={(event => handleChange("category", event))} className="form-control" >
                        <option>Please select a category</option>
                        { categories && categories.map((category, index) => {
                            return (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="#name-input">Name:</label>
                    <input value={name} onChange={(event) => handleChange("name", event)} id="name-input" type="text" className="form-control">
                    
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="description-input">Description:</label>
                    <textarea value={description} onChange={(event) => handleChange("description", event)} id="description-input" type="text" className="form-control">
                      
                    </textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="#price-input">Price:</label>
                    <input value={price} onChange={(event) => handleChange("price", event)} id="price-input" type="number" className="form-control" min="0" placeholder="0">
            
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="#quantity-input">Quantity:</label>
                    <input value={quantity} onChange={(event) => handleChange("quantity", event)} id="quantity-input" type="number" className="form-control" min="0" placeholder="0"></input>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        )
    }

    const showSuccess = () => {
        if(success){
            return (
                <div className="alert alert-success">{createdProduct.name} created successfully</div>
            )
        }
    }

    const showError = () => {
        if(error) {
            return (
                <div className="alert alert-danger">{error}</div>
            )
        }
    }

    const backToDashboard = () => {
        return (
            <div className="mt-4">
                 <Link to="/admin/dashboard">Back to dashboard</Link>
            </div>
        )
    }


    return (
        <Layout title="Create a new product">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showError()}
                        {showSuccess()}
                        {newProductForm()}
                        {backToDashboard()}
                    </div>
                </div>
            </div>
           
        </Layout>
    )
}

export default AddProduct;