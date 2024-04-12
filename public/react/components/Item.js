import React, { useState } from "react";
import apiURL from "../api";
import UpdateForm from './UpdateForm.js'

export const Item = ({ cart, setCart, item, currentItem, setCurrentItem }) => {
    const [toUpdate, setToUpdate] = useState(false)


    async function fetchItem(id) { // fetch item using GET request with params.id
        try {
            const response = await fetch(`${apiURL}/items/${id}`);
            const itemData = await response.json();
            console.log(itemData)
            setCurrentItem(itemData);
        } catch (err) {
            console.log("Oh no an error! ", err)
        }
    }

    // handleClick selects or unselects item

    function handleClick(id) {
        if (!currentItem) {
            fetchItem(id)
        } else {
            setCurrentItem(false)
        }
    }

    const handleDelete = async () => { //onClick that handles delete request
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
    function handleUpdate() { // onClick to handle update

        if (!toUpdate) {
            setToUpdate(true)
        } else {
            setToUpdate(false)
        }
    }


    const handleAddToCart = () => { // onClick adds current item to cart

        setCart([...cart, currentItem])
        alert(`Successfully added to cart`);
    }

    return (
        <>
            {!currentItem

                ? ( // renders single item if true

                    <div class="container item">
                        <div class="col">
                            <div class="row-md-4 offset-md-2">
                                <img class="img-fluid thumbnail" src={item.image} onClick={() => handleClick(item.id)}></img>
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
                        {!toUpdate

                            ? ( // renders update form if true

                                <>
                                    <div class="container current-item">
                                        <div class="col p-4 text-center">
                                            <div class="row">

                                                <img class="img-fluid showcase-image" src={currentItem.image} onClick={() => handleClick(currentItem.id)}></img>

                                                <p><strong>{currentItem.name}</strong></p>
                                            </div>
                                            <div class="row">
                                                <p>{currentItem.description}</p>
                                                <p>{currentItem.price}</p>
                                                <p>{currentItem.category}</p>
                                            </div>
                                            <div class="row">
                                                <div class="col">

                                                    <button class="showcase-button" onClick={() => handleClick(currentItem.id)}>Back</button>
                                                </div>
                                                <div class="col">
                                                    <button class="showcase-button" onClick={() => handleUpdate()}>Change</button>
                                                </div>
                                                <div class="col">
                                                    <button class="showcase-button" onClick={() => handleAddToCart()}>Add To Cart</button>
                                                </div>
                                                <div class="col">
                                                    <button class="showcase-button delete" onClick={handleDelete}>Delete</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div class="container">
                                        <div class="col">
                                            <UpdateForm currentItem={currentItem} setCurrentItem={setCurrentItem} />
                                        </div>
                                        <button class="back-button" onClick={() => handleUpdate()}>Back</button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                )}
        </>
    )
}