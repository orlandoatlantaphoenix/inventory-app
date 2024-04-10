import React from "react";
import { Item } from "./Item";

export const ItemList = ({ items, currentItem, setCurrentItem }) => {

    return (
        <>
            <div class="row">
                {items.map((item, key) => (
                    <>
                        <div class="col-md-4">
                            <Item key={key} item={item} currentItem={currentItem} setCurrentItem={setCurrentItem} />
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}