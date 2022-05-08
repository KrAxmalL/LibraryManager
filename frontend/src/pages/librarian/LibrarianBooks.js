import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooksSummary } from "../../api/books";
import ContentTable from "../../components/layout/ContentTable";
import Layout from "../../components/layout/Layout";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";

import classes from './LibrarianBooks.module.css';

const bookFields = ['ISBN', 'Назва', 'Автори', 'Жанри', 'Детальніше'];

function LibrarianBooks() {

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async() => {
            try {
                setIsLoading(true);
                console.log(accessToken);
                console.log('fetching books');
                const fetchedBooks = await getBooksSummary(accessToken);
                const mappedBooks = fetchedBooks.map(book => {return {
                    ...book,
                    details: <Link to={`/librarian/books/${book.isbn}`}>Детальніше</Link>
                }})
                setBooks(mappedBooks);
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBooks();
    }, [accessToken, setBooks]);

    return (
        <LibrarianLayout>
            <h1 className={classes['page-title']}>Каталог книг</h1>
            <div className="container">
            {!isLoading &&
                <ContentTable columns={bookFields} data={books} />
            }
            </div>
        </LibrarianLayout>
    );
}

export default LibrarianBooks;