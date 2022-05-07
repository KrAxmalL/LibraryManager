import React from "react";
import { useState } from "react";

function CheckboxGroup(props) {
    const items = props.items;
    console.log('items from parent: ' + JSON.stringify(items));
    const [checkedItems, setCheckedItems] = useState(new Array(items.length).fill(false));
    console.log('checked Items: ' + JSON.stringify(checkedItems));

    const handleCheckStateChange = (index) => {
        setCheckedItems(prevState => prevState.map((isChecked, position) => {
            return index === position
                    ? !isChecked
                    : isChecked;
        }));

        props.onSelectionChange(checkedItems.map(item => item.id));
    };

    return (
        <ul className={props.className}>
            {items.map((item, index) =>
                <li key={item.id}>
                    <input type='checkbox' value={item.id}
                           checked={checkedItems[index]}
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