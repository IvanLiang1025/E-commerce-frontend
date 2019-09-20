

export const addItemToCart = (item, count) => {
    let cart = [];
    let found = false;
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
            for (let product of cart){
                if(product._id === item._id){
                    product.count += count;
                    found = true;
                    break;
                }
            }
            console.log(cart);
            
        }
        if(!found){
            cart.push({
                ...item,
                count
            })
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

export const getTotalItems = () => {
    let total = 0;
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            let cart = JSON.parse(localStorage.getItem("cart"));
            // console.log(cart);
            for (let product of cart){
                total += JSON.parse(product.count);
            }
        }
        return total;
    }
}


export const getCart = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return []
}

export const updateQuantiy = (item, count) => {
    let cart = [];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
            for (let product of cart){
                if(product._id === item._id){
                    product.count = count;
                    break;
                }
            }  
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
    }
}

export const removeItemFromCart = (item) => {
    let cart = [];
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
            cart.map((product, index) => {
                if(product._id === item._id){
                    cart.splice(index, 1);
                }
            })
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        
    }
    return cart;
}

export const clearCart = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            localStorage.removeItem("cart");
            return true;
        }  
        return false;
    }
}
