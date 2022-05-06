import React from "react";
import ContentTable from "../../components/layout/ContentTable";
import HeaderLayout from "../../components/layout/HeaderLayout";

import classes from './ReaderCheckouts.module.css';

const checkoutFields = ['ISBN', 'Книга', 'Примірник', 'Номер видачі', 'Дата видачі', 'Очікувана дата повернення', 'Реальна дата повернення'];
const checkouts = [{val: '1', val2: '2', val3: '3', val4: '4', val5: '5', val6: '6', val7: '7'}];

function ReaderCheckouts() {
    return (
        <HeaderLayout>
            <h1 className={classes['page-title']}>Історія видач</h1>
            <div className="container">
                <div className={`container text-left ${classes['middle-container']}`}>
                    <ContentTable columns={checkoutFields} data={checkouts} />
                </div>
            </div>
        </HeaderLayout>
    );
}

export default ReaderCheckouts;