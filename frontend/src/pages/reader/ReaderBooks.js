import React from "react";
import ContentTable from "../../components/layout/ContentTable";
import HeaderLayout from "../../components/layout/HeaderLayout";

import classes from './ReaderBooks.module.css';

const bookFields = ['ISBN', 'Назва', 'Автори', 'Жанри', 'Детальніше'];
const books = [{val: '1', val2: '2', val3: '3', val4: '4', val5: '5'}];

function ReaderBooks() {
    return (
        <HeaderLayout>
            <h1 className={classes['page-title']}>Бібліотека</h1>
            <div className="container">
                <div className={`container text-left ${classes['middle-container']}`}>
                        <p>Пошук:
                            <input type="text" size="40" />
                            <button className={classes.btn}>Знайти</button>
                        </p>
                        <p>Жанри</p>
                        <ul></ul>
                        <p>Автори:</p>
                        <ul></ul>
                        <ContentTable columns={bookFields} data={books} />
                </div>
            </div>
        </HeaderLayout>
    );
}

export default ReaderBooks;