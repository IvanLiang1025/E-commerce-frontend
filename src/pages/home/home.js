
import React, {useState, useEffect} from "react";
import Layout from "../../common/layout";
import Card from "../../common/card";
import {getProducts} from  "../apiCore";


const Home = () => {

    const [productsBySell, setProductsBySell] = useState();
    const [error, setError] = useState("");
    const [productsByArrival, setProductsByArrival] = useState();

    useEffect(() => {
        const loadProductsBySell = () => {
            getProducts("sold")
                .then(data => {
                    if(data.error){
                        setError(data.error);
                    }else{ 
                        setProductsBySell(data);
                        setError("");
                    }
                })
        }
    
        const loadProductsByArrival = () => {
            getProducts("createdAt")
                .then(data => {
                    if(data.error){
                        setError(data.error);
                    }else{
                       
                        setProductsByArrival(data);
                        setError("");
                    }
                })
        }
        loadProductsBySell();
        loadProductsByArrival();
        console.log("useEffect");
    }, []);

    


    return (
        <Layout title="Home">
            {error && alert(error)}
            <div className="container-fluid">
                <h3 className="mb-4 ml-5">Best Seller</h3>
                <hr />
                <div className="row mr-5 ml-5">
                    {productsBySell && productsBySell.map((product, index) => {
                        return (
                            <div key={product._id} className="col-3 mb-3">
                                <Card  product={product} />
                            </div>
                            
                        )
                    })}
                </div>
                <h3 className="mb-4 ml-5">New Arrivals</h3>
                <hr />
                <div className="row mr-5 ml-5">
                    {productsByArrival && productsByArrival.map((product, index) => {
                        return (
                            <div key={product._id} className="col-3 mb-3">
                                <Card  product={product} />
                            </div>
                            
                        )
                    })}
                </div>
            </div>         
        </Layout>
    )
}

export default Home;