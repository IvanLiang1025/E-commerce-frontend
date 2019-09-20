

import React, {useState} from "react";
import Layout from "../common/layout";
import {signin, authenticate, isAuthenticated} from "../auth/index";
import {Redirect} from "react-router-dom";


const Signin = () => {

    const [values, setValues] = useState({
        email: "ljh@gmail.com",
        password: "123456",
        error: "",
        loading: false,
        redirectToReferer: false
    })
    const {email, password, error, loading, redirectToReferer} = values;
    const {user} = isAuthenticated();
    
    const handleChange = (name,event) => (
        setValues({...values, [name]: event.target.value})
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading:true, redirect: false})
        signin({email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading: false});
                }else{
                    authenticate(data, ()=>{
                        setValues({...values, error:"", loading: false, redirectToReferer: true});
                    })  
                }
            })
    }

    const redirectUser = () =>{
        if(redirectToReferer){
            console.log(user.role);
           if(user.role === 1){
               return <Redirect to="/admin/dashboard"></Redirect>
           }else{
               return <Redirect to="/user/dashboard"></Redirect>
           }
        }
    }

    const SigninForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="#signin-email">Email:</label>
                <input type="email" onChange={event => handleChange("email", event)} className="form-control" value={email} id="signin-email" ></input>
            </div>
            <div className="form-group">
                <label htmlFor="#signin-password">password:</label>
                <input type="password" onChange={event => handleChange("password", event)} value={password} className="form-control" id="signin-password"></input>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Sign in</button>
        </form>
    )
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "":"none"}}>
            {error}
        </div>
    )

    const showLoding = () => (
        <div className="alert alert-info" style={{display: loading ? "":"none"}}>
            loading 
        </div>
    )
    

    return (
        <Layout title="Sign in" description="Sign in with your email and password" className="container col-md-8 offset-md-2">
            {showError()}
            {showLoding()}
            {SigninForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin;