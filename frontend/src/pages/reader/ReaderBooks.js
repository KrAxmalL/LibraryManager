import React, { useEffect, useState } from "react";
import ContentTable from "../../components/layout/ContentTable";
import HeaderLayout from "../../components/layout/HeaderLayout";

import { getBooksSummary } from '../../api/books';
import classes from './ReaderBooks.module.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const bookFields = ['ISBN', 'Назва', 'Автори', 'Жанри', 'Детальніше'];

function ReaderBooks() {

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
            try {
                console.log(accessToken);
                console.log('fetching books');
                const fetchedBooks = await getBooksSummary(accessToken);
                const mappedBooks = fetchedBooks.map(book => {return {
                    ...book,
                    details: <Link to={`/reader/books/${book.isbn}`}>Детальніше</Link>
                }})
                setBooks(mappedBooks);
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBooks();
    }, [accessToken, setIsLoading]);

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
                        {!isLoading && <ContentTable columns={bookFields} data={books} />}
                </div>
            </div>
        </HeaderLayout>
    );
}

export default ReaderBooks;