
import {API} from "../config";
import axios from "axios"; 

export const signup = (user) => {
    return axios.post(`${API}/signup`, user)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            if(err.response.data){
                return err.response.data;
            }else{
                console.log(err);
            } 
        })
}

export const signin = (user) => {
    return axios.post(`${API}/signin`, user)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                if(err.response.data){
                    return err.response.data;
                }else{
                    console.log(err);
                }
            })
} 


export const authenticate = (data, callback) => {
    console.log(window);
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        callback();
    }
}

export const signout = (callback) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        callback();
        return axios.post(`${API}/signout`)
                .then(res => {
                    return res.data;
                })
                .catch(err => {
                    console.log(err);
                })
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}