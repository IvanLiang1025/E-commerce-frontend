

import React, {useState} from "react";

const RadioButton = ({prices, handleFilters}) => {

    const [checked, setChecked] = useState(0);
    
    const handleToggle = (event) => {
        setChecked(event.target.value);
        handleFilters(event.target.value);
    }

    return (
        <ul>
            {prices.map((price, index) => {
                return (
                    <li key={price._id} className="list-unstyled">
                        <input name="price" value={price._id} onChange={(event) => handleToggle(event)} className="form-check-input" type="radio"></input>
                        <label className="form-check-label">{price.name}</label>
                    </li>
                )
            })}
        </ul> 
        
    )
}

export default RadioButton;