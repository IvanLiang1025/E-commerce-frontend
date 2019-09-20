
import React from "react";
import {isAuthenticated} from "./index";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={(props) => {
                console.log(props);
                return isAuthenticated() ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to={{pathname: "/signin", state: {from: props.location}}}></Redirect>
                )
            }
        } /> 
    )
}

export default PrivateRoute;