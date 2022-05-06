import React from "react";
import { useParams } from "react-router-dom";
import ContentTable from "../../components/layout/ContentTable";
import HeaderLayout from "../../components/layout/HeaderLayout";

import classes from './ReaderBookDetails.module.css';

const bookFields = ['ISBN', 'Назва', 'Жанри', 'Автори', 'Місто видання', 'Видавництво', 'Рік видання',
                    'Кількість сторінок', 'Доступні екземпляри', 'Найближча дата повернення'];
const book = [{val: '1', val2: '2', val3: '3', val4: '4', val5: '5',
                val6: '6', val7: '7', val8: '8', val9: '9', val10: '10'}];

function ReaderBookDetails() {
    const params = useParams();
    return (
        <HeaderLayout>
            <h1 className={classes['page-title']}>Детально про книгу {params.bookIsbn}</h1>
            <div className="container">
                <div className={`container text-left ${classes['middle-container']}`}>
                    <ContentTable columns={bookFields} data={book} />
                </div>
            </div>
        </HeaderLayout>
    );
}

export default ReaderBookDetails;