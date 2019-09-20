
import React from "react";
import {isAuthenticated} from "./index";
import {Route, Redirect} from "react-router-dom";

const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={(props) => {
                console.log(props);
                return isAuthenticated() && isAuthenticated().user.role === 1 ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to={{pathname: "/", state: {from: props.location}}}></Redirect>
                )
            }
        } /> 
    )
}

export default AdminRoute;