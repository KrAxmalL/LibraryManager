import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllAreas } from "../../api/areas";
import { addNewBook, getBooksSummary } from "../../api/books";
import { getAllExemplars } from "../../api/exemplars";
import Layout from "../../components/layout/Layout";
import AddBookForm from "../../components/librarian/AddBookForm";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";

import classes from './LibrarianAddBook.module.css';

function LibrarianAddBook() {
    const accessToken = useSelector(state => state.auth.accessToken);

    const [books, setBooks] = useState([]);
    const [areas, setAreas] = useState([]);
    const [exemplars, setExemplars] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                console.log(accessToken);
                console.log('fetching book details');
                const fetchedBooks = await getBooksSummary(accessToken);
                const fetchedAreas = await getAllAreas(accessToken);
                const fetchedExemplars = await getAllExemplars(accessToken);
                setBooks(fetchedBooks);
                setAreas(fetchedAreas);
                setExemplars(fetchedExemplars);
            } catch(e) {
                console.log(e);
            }
        }
        fetchData();
    }, [accessToken]);

    const sendAddBook = async(bookToAdd) => {
        await addNewBook(accessToken, bookToAdd);
    }

    return (
        <LibrarianLayout>
            <div className="container">
                <div className={`container text-center ${classes['middle-container']}`}>
                <div className="container">
                    <section>
                        <AddBookForm books={books} areas={areas} exemplars={exemplars} onBookAdd={sendAddBook}/>
                    </section>
                </div>
                </div>
            </div>
        </LibrarianLayout>
    );
}

export default LibrarianAddBook;