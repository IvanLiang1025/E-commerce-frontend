
import React, {useState} from "react";
import {API} from "../../config";
import {Link} from "react-router-dom";
const Item = ({item, removeItem, updateCart}) => {

    const [count, setCount] = useState(item.count);

    const handleChange = (event) => {
        setCount(event.target.value);
        updateCart(item, event.target.value);
    }

    const handleClick = () => {
        removeItem(item);
    }

    return (
        <tr>
        <th scope="row">
            <div>
                <img src={`${API}/product/photo/${item._id}`} alt={item.name} style={{width: "80px"}}></img>
                <div className="ml-3 d-inline-block align-middle">
                    <Link className="text-dark" to={`/product/${item._id}`}>{item.name.length > 20 ? item.name.substring(0, 40) + "..." : item.name}</Link>
                </div>
            </div>
        </th>
            <td className="align-middle">{item.price}</td>
            <td className="align-middle">
                <input type="number" min="1" value={count} style={{width: "50px"}} onChange={(event) => handleChange(event)} ></input>
            </td>
            <td className="align-middle">
                <button onClick={handleClick}>Remove</button>
            </td>
        </tr>
    )
}

export default Item;