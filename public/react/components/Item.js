import React from "react";
import apiURL from "../api";
export const Item = ({item, currentItemId}) => {

    async function fetchItem(){
		try {
			const response = await fetch(`${apiURL}/items/${currentItemId}`);
			const itemData = await response.json();
			
			setItems(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}


    return (
        <div>
            <img src={item.image}></img>
            <p><strong>{item.name}</strong></p>
            <p>{item.description}</p>
            <p>{item.price}</p> 
            <p>{item.category}</p>      
        </div>
    )
}