import { useState } from "react"
import apiURL from "../api";

function UpdateForm({currentItem, setCurrentItem}) {
  const [name, setName] = useState(currentItem.name)
  const [price, setPrice] = useState(currentItem.price)
  const [description, setDescription] = useState(currentItem.description)
  const [category, setCategory] = useState(currentItem.category) 
  const [image, setImage] = useState(currentItem.image)

  async function submitHandler(e) {
    e.preventDefault()
  
    const newItem = {
      name,
      price,
      description,
      category,
      image,
    }
    await fetch(`${apiURL}/items/${currentItem.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newItem)
    })
    setCurrentItem(null)
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder={currentItem.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      <input
        type="number"
        placeholder={currentItem.price}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder={currentItem.category}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder={currentItem.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        <input
          type="text"
          placeholder={currentItem.image}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit">Submit</button>
    </form>
  )
}

export default
  UpdateForm

