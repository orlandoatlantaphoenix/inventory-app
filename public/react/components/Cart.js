import { useState } from "react";
import apiURL from "../api";

const Cart = ({ setCart, setViewCart, cart }) => {
    console.log(`from cart`, cart)

    let temp = 0;
    cart.forEach(item => {
        temp += item.price;
    })
    
    return (
        <>
            {cart.length == 0 ? (
                <>
                    <h1>Your Cart is Empty</h1>
                    <button onClick={() => setViewCart(false)}>Back</button>
                </>) : (
                <>
                    <h1>Cart</h1>
                    <button onClick={() => setViewCart(false)}>Back</button>
                    <button>Purchase</button>
                    <h3>Total: {temp}</h3>
                    {cart.map((item, index) => {
                        return (
                            <section key={index}>
                                <img src={item.image} />
                                <button onClick={() => setCart(cart.filter((item) => item != cart[index]))}>REMOVE</button>
                                <p>Name: {item.name}</p>
                                <p>Description: {item.description}</p>
                                <p>Price: {item.price}</p>
                                <p>Category: {item.category}</p>
                            </section>
                        )
                    })}
                </>
            )}
        </>

    )
}


export default Cart