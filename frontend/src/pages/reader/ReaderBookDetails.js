import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ContentTable from "../../components/layout/ContentTable";
import HeaderLayout from "../../components/layout/HeaderLayout";

import { getBookDetails } from "../../api/books";

import classes from './ReaderBookDetails.module.css';

const bookFields = ['ISBN', 'Назва', 'Жанри', 'Автори', 'Місто видання', 'Видавництво', 'Рік видання',
                    'Кількість сторінок', 'Доступні примірники'];

function ReaderBookDetails() {
    const params = useParams();

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = useState([]);

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
            try {
                console.log(accessToken);
                console.log('fetching book details');
                const fetchedBook = await getBookDetails(accessToken, params.bookIsbn);
                console.log(JSON.stringify(fetchedBook));
                fetchedBook.availability =
                    fetchedBook.availableExemplars.length === 0
                     ? `Доступних примірників немає! Найближча дата повернення: ${fetchedBook.closestAvailableExemplar}`
                     : `${fetchedBook.availableExemplars}`;
                delete fetchedBook.availableExemplars;
                delete fetchedBook.closestAvailableExemplar;
                setBook([fetchedBook]);
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBooks();
    }, [accessToken, params, setIsLoading]);

    return (
        <HeaderLayout>
            <h1 className={classes['page-title']}>Книга</h1>
            <div className="container">
                <div className={`container text-left ${classes['middle-container']}`}>
                    {!isLoading && <ContentTable columns={bookFields} data={book} />}
                </div>
            </div>
        </HeaderLayout>
    );
}

export default ReaderBookDetails;