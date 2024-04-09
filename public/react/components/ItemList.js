import React from "react";
import { Item } from "./Item";

export const ItemList = ({items, currentItem, setCurrentItem}) => {

    return (
        <>
            {items.map((item, key) => (
                <>
                    <Item  key={key} item={item} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                </>
            ))}
        </>
    )
}