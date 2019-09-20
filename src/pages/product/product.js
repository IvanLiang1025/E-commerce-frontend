
import React, {useState, useEffect} from "react";
import Layout from "../../common/layout";
import Card from "../../common/card";
import {getProducts, getSingleProduct} from  "../apiCore";
import {withRouter} from "react-router-dom";
import {LoadPhoto} from "../../common/loadPhoto";
import {addItemToCart} from "../cartOperation";


const Product = (props) => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState("");
   

    useEffect(() => {
        const productId = props.match.params.productId;
        const loadSingleProduct = (productId) => {
            getSingleProduct(productId)
                .then(res => {
                    if(res.error) {
                        setError(res.error);
                    }else{
                        // let singleProduct = React.Children.toArray(res);
                        setProduct(res);
                        console.log(res);
                    }
                })
        }
        loadSingleProduct(productId);
        console.log("hello");
    }, [props])

    const addProductToCart = () => {
        addItemToCart(product, 2);
    }

    const dateTransformation = (timeStamp) => {
        const arr = [{
            name: "ljh",
            age: 10
        }]
        console.log(arr.indexOf({
            name: "ljh",
            age: 10
        }))

        let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = new Date(timeStamp);
        console.log(date);
        let year = date.getFullYear();
        let month = date.getMonth();
        return monthArr[month]+ ", " + year;

    }

    return (
        <div className="container-fluid">
            <div className="row mr-5 ml-5 mb-5 mt-5">
                <div className="col-md-5">
                    <LoadPhoto product={product}></LoadPhoto>
                </div>
                <div className="col-md-7 ">
                    {/* <LoadPhoto product={product}></LoadPhoto> */}
                    <div className="product-info mr-5 ml-5">
                        <h4>{product.name}</h4>
                        <p>Description: {product.description}</p>
                        <div>Price: ${product.price}</div>
                        <div>Arrival: {dateTransformation(product.createdAt)}</div>
                        <div>In Stock</div>
                        <div>
                            <label>Quantity:</label>
                            <input type="number" min="0"></input>
                        </div>
                        <button onClick = {addProductToCart}>Add to Cart</button>
                    </div>
                </div>

            </div>
            {JSON.stringify(product)}
        </div>
    )
}

export default Product;