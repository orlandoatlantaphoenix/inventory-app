import { useState } from "react"
import apiURL from "../api";

function UpdateForm({ currentItem, setCurrentItem }) {
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
    await fetch(`${apiURL}/items/${currentItem.id}`, { // fetch PUT request to update item
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem)
    })
    setCurrentItem(null)
  }
  // input boxes to update single items
  return (
    <div class="col form">
      <form onSubmit={submitHandler}>
        <div class="row">
          <input
            type="text"
            placeholder={currentItem.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="row">
          <input
            type="number"
            placeholder={currentItem.price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div class="row">
          <input
            type="text"
            placeholder={currentItem.category}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div class="row">
          <input
            type="text"
            placeholder={currentItem.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div class="row">
          <input
            type="text"
            placeholder={currentItem.image}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div class="row">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default
  UpdateForm

