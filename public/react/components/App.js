import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { ItemList } from './ItemList';
import { Item } from './Item';

export const App = () => {

	const [items, setItems] = useState([]);
	const [currentItemId, setCurrentItemId] = useState(null)

	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemData = await response.json();
			
			setItems(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchItems();
	}, []);
	console.log(currentItemId);
	return (
		<main>	
      <h1>Store</h1>
			{currentItemId === null ? (
				<>
					<h2>Our inventory is 🔥</h2>
					<ItemList items={items} setCurrentItemId={setCurrentItemId}/>	
				</>
			) : (<Item itemId={currentItemId}/>)}
			
		</main>
	)
}