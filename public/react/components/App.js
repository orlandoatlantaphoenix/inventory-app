import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { ItemList } from './ItemList';
import { Item } from './Item';
import Form from './Form.js'
import Cart from './Cart.js'
import { Search } from './Search.js';
export const App = () => {

	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState(false)
	const [item, setItem] = useState("")
	const [toAdd, setToAdd] = useState(false)
	const [viewCart, setViewCart] = useState(false)
	const [cart, setCart] = useState([])
	const [toSearch, setToSearch] = useState(false)
	const [search, setSearch] = useState("")
	const [searching, setSearching] = useState(false)

	async function fetchItems() {
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemData = await response.json();
			console.log(itemData)
			setItems(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchItems();

	}, [currentItem, toAdd]);

	function handleClick() {
		if (!toAdd) {
			setToAdd(true)
		} else {
			setToAdd(false)
		}
	}

	if (!currentItem) {
		return (
			<main>
				
			
				
				<h1>Store</h1>
				<h2>Our inventory is 🔥</h2>
				{ viewCart ? (<Cart setCart={setCart} setViewCart={setViewCart} cart={cart}/>) : 
				(<>
					{toSearch ? (<Search items={items} search={search} 
					setSearch={setSearch} setToSearch={setToSearch} searching={searching} 
					setSearching={setSearching} currentItem={currentItem} setCurrentItem={setCurrentItem}/> )
					: ( <>
						 {!toAdd
							? (
								<>
									<button onClick={() => setViewCart(true)}>{cart.length > 0 ? `Cart (${cart.length})` : `Cart` }</button>
									<button onClick={() => handleClick()}>Add to our inventory</button>
									<button onClick={() => setToSearch(true)}>Search</button>
									<ItemList items={items} setCurrentItem={setCurrentItem} />
								</>

							) : (
								<>
									<h3>Add To it!</h3>
									<Form toAdd={toAdd} setToAdd={setToAdd} />
									<button onClick={handleClick}>Back</button>
								</>
							)}
						</>)}
				</>)}
			</main>
		)
	} else {

		return (
			<Item cart={cart} setCart={setCart} item={item} currentItem={currentItem} setCurrentItem={setCurrentItem} />
		)
	}

}