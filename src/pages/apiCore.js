

import axios from "axios";
import {API} from "../config";


export const getProducts = (sortBy) => {
    return axios.get(`${API}/products?sortBy=${sortBy}`)
                .then(res => {
                    return res.data;
                })
                .catch(err => {
                    if(err.response.data){
                        return err.response.data
                    }
                    console.log(err);
                })
}

export const getAllCategories = () => {
    return axios.get(`${API}/category`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                if(err.response.data){
                    return err.response.data;
                }
                console.log(err);
            })
}


export const getFilteredProducts = (skip, limit, filters) => {

    const data = {
        skip, limit, filters
    }
    return axios.post(`${API}/products/search`,  data)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log("hello");
                if(err.response.data){
                    return err.response.data;
                }
                console.log(err);
            })
}


export const getSingleProduct = (productId) => {
    return axios.get(`${API}/product/${productId}`)
                .then(res => {
                    return res.data;
                })
                .catch(err => {
                    if(err.response.data){
                        return err.response.data;
                    }
                    console.log(err);
                })
}


// get braintree client token

export const getBraintreeClientToken = (userId, token) => {
    return axios.get(`${API}/payment/${userId}`, {
        headers: {"Authorization": `Bearer ${token}` }
    })
            .then(res => {
                return res.data
            })
            .catch(err => {
                if(err.response.data){
                    return err.response.data
                }
                console.log(err);
            })
}

export const processPayment = (userId, token, data ) => {
    return axios.post(`${API}/payment/${userId}`, data, {
        headers: {"Authorization": `Bearer ${token}` }
    })
            .then(res => {
                return res.data
            })
            .catch(err => {
                if(err.response.data){
                    return err.response.data
                }
                console.log(err);
                console.log("-----",err);
            })
}



//create order 
export const createOrder = (userId, token, orderData) => {
    return axios.post(`${API}/order/${userId}`, {order: orderData}, {
        headers: {"Authorization": `Bearer ${token}` }
    })
            .then(res => {
                return res.data
            })
            .catch(err => {
                if(err.response.data){
                    return err.response.data
                }
                console.log(err);
                console.log("-----",err);
            })

}