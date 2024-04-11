import React from "react";
import apiURL from "../api";
export const Item = ({ item, currentItem, setCurrentItem }) => {

    async function fetchItem(id) {
        try {
            const response = await fetch(`${apiURL}/items/${id}`);
            const itemData = await response.json();
            console.log(itemData)
            setCurrentItem(itemData);
        } catch (err) {
            console.log("Oh no an error! ", err)
        }
    }

    function handleClick(id) {
        if (!currentItem) {
            fetchItem(id)
        } else {
            setCurrentItem(false)
        }
    }

    const handleDelete = async () => {
        try {
            await fetch(`${apiURL}/items/${currentItem.id}`, {
                method: 'DELETE'
            })
            setCurrentItem(false);
        } catch (error) {
            console.log(error);
            alert(`There was an error deleting your item`);
        }
    }

    return (
        <>
            {!currentItem
                ? (
                    <div class="container item">
                        <div class="col">
                            <div class="row-md-4 offset-md-2">
                                <img class="thumbnail" src={item.image} onClick={() => handleClick(item.id)}></img>
                            </div>
                            <div class="row-md-4 offset-md-2 mx-auto">
                                <p><strong>{item.name}</strong></p>
                            </div>
                            <div class="row row-md-4 offset-md-2 mt-5 mx-auto">
                           
                                <p>{item.price}</p>
                               
                                
                                <p>{item.category}</p>
                               
                            </div>
                            <div class="row-md-2 mt-4">
                                <button onClick={() => handleClick(item.id)}>View</button>
                            </div>
                        </div>
                    </div>)
                : (
                    <div>
                        <button onClick={handleDelete}>DELETE</button>
                        <img src={currentItem.image}></img>
                        <p><strong>{currentItem.name}</strong></p>
                        <p>{currentItem.description}</p>
                        <p>{currentItem.price}</p>
                        <p>{currentItem.category}</p>
                        <button onClick={() => handleClick(currentItem.id)}>Back</button>
                    </div>
                )}
        </>
    )
}