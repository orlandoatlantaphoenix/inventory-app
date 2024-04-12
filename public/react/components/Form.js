import { useState } from "react"

function Form({ toAdd, setToAdd }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(Number)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")

  async function submitHandler(e) {
    e.preventDefault()

    const newItem = {
      name,
      price,
      description,
      category,
      image,
    }

    // fetch post request to add to inventory
    await fetch('http://localhost:3000/api/items', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem)
    })

    setName("")
    setPrice(Number)
    setDescription("")
    setCategory("")
    setImage("")
  }
  // input boxes to submit add to inventory
  return (
    <div class="col form">
      <form onSubmit={submitHandler}>
        <div class="row">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="row">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div class="row">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div class="row">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div class="row">
          <input
            type="text"
            placeholder="Image"
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
  Form

