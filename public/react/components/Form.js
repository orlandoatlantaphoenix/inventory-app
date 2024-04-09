import { useState } from "react"

function Form({renderForm, setRenderForm}) {
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
  
    await fetch('http://localhost:3000/api/items', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newItem)
    })

    setName("")
    setPrice(Number)
    setDescription("")
    setCategory("")
    setImage("")
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        <input
          type="text"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit">Submit</button>
    </form>
  )
}

export default
  Form

