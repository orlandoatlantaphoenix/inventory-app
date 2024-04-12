import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { ItemList } from './ItemList';
import { Item } from './Item';
import Form from './Form.js'
import { Header } from './Header.js';

export const App = () => {

	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState(undefined)
	const [item, setItem] = useState("")
	const [toAdd, setToAdd] = useState(false)


	async function fetchItems() {
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemData = await response.json();

			setItems(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchItem() {
		try {
			const response = await fetch(`${apiURL}/items/${currentItemId}`);
			const itemData = await response.json();

			setItem(itemData);
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
				<div class="container">
					<div class="row">
						<div class="col-md-2 offset-md-10">
							<button onClick={() => handleClick()}>Add to our inventory</button>
						</div>
					</div>
					<Header />
					{!toAdd
						? (
							<>
								<ItemList items={items} setCurrentItem={setCurrentItem} />
							</>
						) : (
							<>
								<h3>Add To it!</h3>
								<Form items={items} setItems={setItems} />
								<button onClick={handleClick}>Back</button>
							</>
						)}


				</div>
			</main>
		)
	} else {

		return (
			<Item item={item} currentItem={currentItem} setCurrentItem={setCurrentItem} />
		)
	}
}