import React, { useState, useEffect } from "react";

function CheckboxGroup(props) {
    const items = props.items;
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => {
        setCheckedItems(items.map(item => {
            return {
                ...item,
                isChecked: item.isChecked !== undefined
                                ? item.isChecked
                                : false
            }
        }));
    }, [items, setCheckedItems]);

    const handleCheckStateChange = (index) => {
        const newCheckedItems = checkedItems.map((item, position) => {
            if(index === position) {
                item.isChecked = !item.isChecked
            }
            return item;
        });
        setCheckedItems(newCheckedItems);
        props.onSelectionChange(newCheckedItems.map(item => item.isChecked));
    };

    return (
        <ul className={props.className}>
            {checkedItems.map((item, index) =>
                <li key={item.id}>
                    <input type='checkbox' value={item.id}
                           checked={item.isChecked}
                           onChange={() => handleCheckStateChange(index)}>
                    </input>
                    {item.displayValue}
                </li>
                )
            }
        </ul>
    );
}

export default CheckboxGroup;