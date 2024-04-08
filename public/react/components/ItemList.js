import React from "react";
import { Item } from "./Item";

export const ItemList = ({items, setCurrentItemId}) => {

    return (
        <>
            {items.map((item, key) => (
                <>
                    <Item  item={item} key={key} setCurrentItemId={setCurrentItemId}/>
                    <button onClick={() => setCurrentItemId(item.id)}>View</button> 
                </>
            ))}
        </>
    )
}