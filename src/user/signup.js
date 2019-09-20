


import React, {useState} from "react";
import Layout from "../common/layout";
import {Link} from "react-router-dom";
import {signup} from "../auth/index";


const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })
    const {name, email, password, error, success} = values;
    const handleChange = (name) => event => {
        setValues({...values, [name]: event.target.value});
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error: "", success: false});
        signup({name, email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, success: false});
                }else{
                    setValues({
                    name: "",
                    email: "",
                    password: "", 
                    error: "", 
                    success: true});
                }
            })  
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "":"none"}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? "":"none"}}>
            you have signed up successfully. Please <Link to="/signin"> sign in</Link>
        </div>
    )

    const signupForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="#sign-name">Name:</label>
                    <input onChange={handleChange("name")} type="text" value={name} className="form-control" id="signup-name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="#sign-email">Email:</label>
                    <input onChange={handleChange("email")} type="text" value={email} className="form-control" id="signup-email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="#sign-pwd">password:</label>
                    <input onChange={handleChange("password")} type="text" value={password} className="form-control" id="signup-pwd"></input>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        )
    }

    return (
        <Layout title="Signup" description="sign up to explore more" className="container col-md-8 offset-md-2">
           {showError()}
           {showSuccess()}
           {signupForm()}
        </Layout>
        
    )
}

export default Signup;