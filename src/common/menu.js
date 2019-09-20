

import React from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth";
import {getTotalItems} from "../pages/cartOperation";

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#fff", fontWeight: "bold"};
    }else{
        return {color: "#000"};
    }
}

const Menu = (props) => {
    let {history} = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#F2E0CF"}}>
            <Link className="navbar-brand" to="/">Logo</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/shop" style={isActive(history, "/shop")}>Shop</Link>
                    </li>
                    {!isAuthenticated() && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>SignIn</Link>
                        </li>
                    )}
                    {isAuthenticated() && (
                        <li className="nav-item">
                            <span style={{color: "#000", cursor: "pointer"}} className="nav-link" onClick={() => (signout(()=>(history.push("/"))))}> SignOut</span>
                        </li>
                    )}
                   
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>SignUp</Link>
                    </li>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/dashboard" style={isActive(history, "/user/dashboard")} >Dashboard</Link>
                            </li>   
                        )
                    }
                    {
                        isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/dashboard" style={isActive(history, "/admin/dashboard")} >Dashboard</Link>
                            </li>
                        )
                    }
                     <li className="nav-item">
                        <Link className="nav-link" to="/cart" style={isActive(history, "/cart")}>Cart <span className="badge badge-info">{getTotalItems()}</span></Link>
                    </li>
                   
                </ul>
            </div>
        </nav>
    );
};

export default withRouter(Menu);