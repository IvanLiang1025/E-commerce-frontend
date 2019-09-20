

import React, {useState, useEffect} from "react";
import {getBraintreeClientToken, processPayment, createOrder} from "../apiCore";
import {isAuthenticated} from "../../auth/index";
import {clearCart} from "../cartOperation";
import {Redirect} from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react';

const Chechout = ({products, getItemSubtotal}) => {
    const [values, setValues] = useState({
        clientToken: null,
        success: false,
        error: "",
        address: ""
    })
    const [instance, setInstance] = useState({});
    const [redirect, setRedirect] = useState(false);
    const {clientToken, error, success} = values;
  

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = () => {
        getBraintreeClientToken(userId, token)
            .then(res => {
                if(res.error){
                    setValues({...values, error: res.error});
                }else{
                    setValues({...values, clientToken: res.clientToken});
                }
            })
    }

    useEffect(() => {
        getToken(userId, token);
    }, [])   

    async function buy () {
        try{
            setRedirect(false);
            let nonce;
            setValues({...values, error: ""});
            let res = await instance.requestPaymentMethod();
            nonce = res.nonce;
            let data = {
                paymentMethodNonce: nonce,
                amount: getItemSubtotal()
            }
            let processRes  = await processPayment(userId, token, data);
            setValues({...values, success: processRes.success});
            console.log(processRes);
            
            const orderData = {
                products,
                transactionId: processRes.transaction.id,
                amount: processRes.transaction.amount
            }
            console.log(orderData);
            createOrder(userId, token, orderData)
            // if(clearCart()){
            //     setRedirect(true);
            // }
            
        }catch(err){
            if(err.message){
                console.log(err.message);
                setValues({...values, error: err.message});
                return;
            }  
            console.log("----",err);

        }

    }
    // const buy = () => {
    //     let nonce;
    //     setValues({...values, error: ""})
    //     instance.requestPaymentMethod()
    //         .then(res => {
    //             console.log(res);
    //             nonce = res.nonce;
                
    //             // send nonce as "paymentMethodNonce" and total to backend
    //             let data = {
    //                 paymentMethodNonce: nonce,
    //                 amount: getItemSubtotal()
    //             }
    //             console.log(getItemSubtotal());
    //             // processPayment(userId, token, data)

    //         })
    //         .catch(error => {
    //             console.log("dropin error: ", error);
    //             setValues({...values, error: error.message})
    //         })
    // }

    const showDropIn = () => (
        clientToken !==null && products.length > 0 ? (
            <div onBlur={()=> setValues({...values, error: ""})}>
                <DropIn options={{authorization: clientToken}} onInstance={instance => setInstance(instance)}> </DropIn>
                <button onClick={buy} className="btn btn-info btn-block">Pay</button>
            </div>
        ) : null
    )

    const showError = () => {
        return error !== "" && (
            <div className="alert alert-danger">{error}</div>
        )
    }


    const showSuccess = () => {
        return  success && (
            <div className="alert alert-success">Thanks! Your payment is successful</div>
        )
    }   
    

    return (
        <div>
            {getItemSubtotal()}
            {showError()}
            {showSuccess()}
            {showDropIn()}
            {/* { redirect && (<Redirect to="cart"></Redirect>)} */}
        </div>
    )
}

export default Chechout;