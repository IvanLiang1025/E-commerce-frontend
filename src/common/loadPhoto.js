

import React from "react";
import {API} from "../config";


export const LoadPhoto = ({product}) => {
    return (
        <img src={`${API}/product/photo/${product._id}`} alt={product.name} style={{maxHeight: "100%", maxWidth:"100%"}}></img>
    )
}

