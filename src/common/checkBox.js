

import React, {useState} from "react";

const CheckBox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([]);
    

    const handleToggle = (categoryId) => {
        const newChecked = [...checked];
        const index = newChecked.indexOf(categoryId);
        // console.log(newChecked);
        if(index === -1){
            newChecked.push(categoryId);
        }else{
            newChecked.splice(index, 1);
        }
        console.log(newChecked);
        setChecked(newChecked);
        handleFilters(newChecked);
    }

    return (
        <ul>
            {categories.map((category, index) => {
                return (
                    <li key={category._id} className="list-unstyled">
                        <input onChange={() => handleToggle(category._id)} className="form-check-input" type="checkbox"></input>
                        <label className="form-check-label">{category.name}</label>
                    </li>
                )
            })}
        </ul> 
        
    )
}

export default CheckBox;