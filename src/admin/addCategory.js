
import React, {useState} from "react";
import Layout from "../common/layout";
import {createCategory} from "./apiAdmin";
import {isAuthenticated} from "../auth/index";
import {Link} from "react-router-dom";

const AddCategory = () => {
    const [values, setValues] = useState({
        name: "",
        error: "",
        success: false
    })

    const {name, error, success} = values;
    const {token, user} = isAuthenticated();
    
    const handleChange = (event) => {
        
        setValues({...values, name: event.target.value});
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:"", success: false});
        
        createCategory(user._id, token, {name})
            .then(data => {
                console.log(data);
                if(data.error) {
                    setValues({...values, error: data.error, success: false});
                }else{
                    setValues({name: "", error: "", success: true})
                }
            })
    }

    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="#category-name">Name:</label>
                <input required onChange={(event) => handleChange(event)} className="form-control" id="category-name" value={name}></input>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    )

    const showSuccess = () => {
        if(success){
            return (
                <div className="alert alert-success">Category created successfully</div>
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
        <Layout title="Create a new Category">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showSuccess()}
                        {showError()}
                        {newCategoryForm()}
                        {backToDashboard()}
                    </div>
                </div>
            </div>
        </Layout>
        
    )
}

export default AddCategory;