import { Item } from './Item.js'

export const Search = ({ items, search, setSearch, setToSearch, searching, setSearching, currentItem, setCurrentItem }) => {

  function submitHandler(e) {
    e.preventDefault()
    setSearching(true)
  }
  function handleClick() { // handleClick function that returns home page
    setSearch("")
    setSearching(false)
    setToSearch(false)
  }
  return (
    <>
      <button onClick={() => handleClick()}>Back</button>
      {!searching
        ? ( // ternary that will search upon submit
          <>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">🔍</button>
            </form>
          </>
        ) : (
          <>
            {console.log('else')}
            <h1>Search Results:</h1>
            {items.map((item, key) => {

              if (search === item.name || search === item.category || search === item.price) {
                { console.log(item) }
                return (
                  <>
                    <Item item={item} currentItem={currentItem} setCurrentItem={setCurrentItem} />
                  </>
                )
              }
            })}
          </>
        )}
    </>
  )
}

