import React from "react";

import classes from './ContentTable.module.css';

function ContentTable(props) {
    const columns = props.columns;
    const data = props.data;

    const itemToRow = (item) => {
        const res = [];
        for(const field in item) {
            res.push(<td key={item[field]}>{item[field]}</td>);
        }
        return res;
    }

    return (
        <table className={`table ${classes['content-table']}`}>
            <thead>
                <tr>
                    {columns.map((column, index) => <th key={index}>{column}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => <tr key={index}>{itemToRow(item)}</tr>)}
            </tbody>
        </table>
    );
}

export default ContentTable;