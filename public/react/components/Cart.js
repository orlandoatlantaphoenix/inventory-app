import { useState } from "react";
import apiURL from "../api";

const Cart = ({ setCart, setViewCart, cart }) => {
    const [success, setSuccess] = useState(false);
    const [order, setOrder] = useState({
        id: 0,
        user: '',
        total: 0,
        items: []
    });
    // order total
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    })

    const handleRetrieveOrder = async (orderId) => {
        try {
            const retrievedOrder = await fetch(`${apiURL}/orders/${orderId}`)
            const orderData = await retrievedOrder.json();
            if (orderData) {
                setOrder(orderData);
            }
        } catch (error) {
            console.log(error);
            alert(`There was an error retrieving your order`);
        }
    }

    const handlePurchase = async () => {
        try {
            const newOrder = {
                user: null,
                total: total,
                items: cart,
            }

            const createOrder = await fetch(`${apiURL}/orders`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder)
            })
            const data = await createOrder.json();
            if (createOrder.ok) {
                await handleRetrieveOrder(data.id);
                total = 0;
                setCart([])
                setSuccess(true)
            }
        } catch (error) {
            console.log(error);
            alert(`There was an error processing your order`);
        }
    }

    return (
        <>
            {success ? (
                <>
                    <div class="container">
                        <section>

                            <h1>Success!</h1>
                            <h3>Order successfully created.</h3>
                            <h3>Order Info</h3>
                            <h3>Order Total: {order.total}</h3>
                            <h3>Order ID: {order.id}</h3>
                            <h3>Items: {order.items.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img src={item.image} />
                                        <p>Name: {item.name}</p>
                                        <p>Description: {item.description}</p>
                                        <p>Price: {item.price}</p>
                                        <p>Category: {item.category}</p>
                                    </div>
                                )
                            })}</h3>
                        <button class="back-button" onClick={() => setSuccess(false)}>Back</button>
                        </section>
                    </div>
                </>) :
                (<>
                    {cart.length == 0 ? (
                        <>
                            <h1>Your Cart is Empty</h1>
                            <button class="back-button" onClick={() => setViewCart(false)}>Back</button>
                        </>) : (
                        <>  
                        <div class="container">
                            <div class="col">
                            <h1 class="form-title">Cart</h1>

                            <h3>Total: {total}</h3>
                            {cart.map((item, index) => {
                                return (<>
                                <div class="row ">
                                    <section key={index}>
                                        <img class="showcase-image"src={item.image} />
                                        <button onClick={() => setCart(cart.filter((item) => item != cart[index]))}>X</button>
                                        <p>Name: {item.name}</p>
                                        <p>Description: {item.description}</p>
                                        <p>Price: {item.price}</p>
                                        <p>Category: {item.category}</p>
                                    </section>
                                    </div>
                                    </>
                                )
                            })}
                            <div class="row">
                                <div class ="col">
                            <button class="showcase-button"onClick={handlePurchase}>Purchase</button>
                            </div>
                            <div class="col">
                            <button class="back-button m-0" onClick={() => setViewCart(false)}>Back</button>
                            </div>
                            </div>
                            </div>
                            </div>
                        </>
                    )}

                </>)}
        </>

    )
}


export default Cart