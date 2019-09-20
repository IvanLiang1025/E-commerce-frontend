
import React, {useState, useEffect, Fragment} from "react";
import {getCart, removeItemFromCart, updateQuantiy} from "../cartOperation";
import Item from "./item";
import {Link, Redirect} from "react-router-dom";
import Checkout from "../checkout/checkout";
import {isAuthenticated} from "../../auth/index";


const Cart= (props) => {

    const [cart, setCart] = useState([]);
    // const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        let newCart = getCart();
        setCart(newCart);
        console.log("---");
    },[])

    const removeItem = (item) => {
        setCart(removeItemFromCart(item));
    }

    const getItemSubtotal = () => {
        let total = cart.reduce((previous, current) => {
            return previous + current.price * current.count;
        }, 0)
      
        return total;
    }

    const updateCart = (item, count) => {
        setCart(updateQuantiy(item, count));
    }

    const showCartItems = () => {
        return  cart.length > 0 ? (
                <Fragment>
                    <div className="col-md-7">
                        <table className="table">
                            <thead>
                                <tr className="bg-light">
                                    <th scope="col">Item</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length > 0 && (
                                    cart.map((item, index) => {
                                        return <Item key={item._id} updateCart={updateCart} removeItem={removeItem} item={item}></Item>
                                    })
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="4">
                                        
                                        <p className=" text-right" style={{color: "red", fontSize: "25px"}}>
                                            Subtotal: ${getItemSubtotal()}
                                            <Link to="/checkout"><button className="btn btn-danger ml-5 text-white">Check Out</button></Link>
                                        </p>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="col-md-5">
                        <Checkout products={cart} getItemSubtotal={getItemSubtotal}></Checkout>
                    </div>
                </Fragment>
            ) : (
                <div className="alert alert-warning">There are no items in cart.</div>
            )
    }

    return (
        <div className="container-fluid">
            <div className="row mr-5 ml-5 mt-5 mb-5">
                {!isAuthenticated() && <Redirect to="/signin"></Redirect>}
                {showCartItems(cart)}
            </div>

        </div>
    )
}

export default Cart;