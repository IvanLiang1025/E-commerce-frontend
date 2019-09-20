

import React from "react"
import {Link} from "react-router-dom";
import {LoadPhoto} from "./loadPhoto";


const Card = ({product}) => {

    return (
        <div className="card">
            <div className="card-body">
                <div className="mb-3" style={{height:"300px"}}>
                    <LoadPhoto product={product} ></LoadPhoto>
                </div>
                {/* <p style={{textAlign: "justify"}}> {product.description.length > 50 ? (product.description.substring(0, 50) + "...") : (product.description)}</p> */}
                <p>{product.name}</p>
                <p>${product.price}</p>
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn btn-outline-secondary mr-2"> View product </button>
                </Link>
            </div>
        </div>
    )
}

export default Card;