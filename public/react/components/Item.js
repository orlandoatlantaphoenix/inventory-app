import React, {useState} from "react";
import apiURL from "../api";
import UpdateForm from './UpdateForm.js'

export const Item = ({cart, setCart, item, currentItem, setCurrentItem}) => {
    const [toUpdate, setToUpdate] = useState(false)

    async function fetchItem(id){
		try {
			const response = await fetch(`${apiURL}/items/${id}`);
			const itemData = await response.json();
			console.log(itemData)
			setCurrentItem(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

    function handleClick (id) {
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
    function handleUpdate() {
        if (!toUpdate){
            setToUpdate(true)
        } else {
            setToUpdate(false)
        }
    }

    const handleAddToCart = () => {
        setCart([...cart, currentItem ])
        alert(`Successfully added to cart`);
    }

    return (
        <>
            { !currentItem
            ?( 
            <div>
                <img src={item.image} onClick = {() => handleClick(item.id)}></img>
                <p><strong>{item.name}</strong></p>
                <p>{item.price}</p> 
                <p>{item.category}</p>
                <button onClick={() => handleClick(item.id)}>View</button> 
            </div>)
            :(
            <div> 
                {!toUpdate
                ?(
                    <>
                        <button onClick={handleDelete}>DELETE</button>
                        <img src={currentItem.image} onClick = {() => handleClick(currentItem.id)}></img>
                        <p><strong>{currentItem.name}</strong></p>
                        <p>{currentItem.description}</p>
                        <p>{currentItem.price}</p> 
                        <p>{currentItem.category}</p>
                        <button onClick = {() => handleClick(currentItem.id)}>Back</button>
                        <button onClick = {() => handleUpdate()}>Change</button>
                        <button onClick = {() => handleAddToCart()}>Add To Cart</button>
                    </>
                ):(
                    <>
                        <UpdateForm currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                        <button onClick = {() => handleUpdate()}>Back</button>
                    </>
                )
                }
            </div>
            )}
        </>
    )
}