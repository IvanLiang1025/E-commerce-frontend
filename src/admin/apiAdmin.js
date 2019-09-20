
import axios from "axios";
import {API} from "../config";


export const createCategory = (userId, token, category) => {
    console.log(category);
    return axios.post(`${API}/category/${userId}`, category,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    )
            .then(res => {
                return res.data;
            })
            .catch(err => {
                if(err.response.data){
                    return err.response.data;
                }
                console.log(err);
            })
};

export const createProduct = (userId, token, formData) => {
    return axios.post(`${API}/product/${userId}`, formData, 
                {
                    headers: 
                    {
                        "Authorization": `Bearer ${token}`, 
                    }   
                }
            )
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