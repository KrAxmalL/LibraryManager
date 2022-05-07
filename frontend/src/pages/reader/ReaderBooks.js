import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentTable from "../../components/layout/ContentTable";
import HeaderLayout from "../../components/layout/HeaderLayout";

import { getAllAuthors, getBooksSummary } from '../../api/books';
import classes from './ReaderBooks.module.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllAreas } from "../../api/areas";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup";

const bookFields = ['ISBN', 'Назва', 'Автори', 'Жанри', 'Детальніше'];

function ReaderBooks() {

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const titleInputRef = useRef();

    useEffect(() => {
        const fetchBooks = async() => {
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
            }
        }

        const fetchAuthors = async() => {
            try {
                const fetchedAuthors = await getAllAuthors(accessToken);
                setAuthors(fetchedAuthors);
            } catch(e) {
                console.log(e);
            }
        }

        const fetchAreas = async() => {
            try {
                const fetchedAreas = await getAllAreas(accessToken);
                setAreas(fetchedAreas);
            } catch(e) {
                console.log(e);
            }
        }

        const fetchData = async() => {
            setIsLoading(true);
            Promise.all([fetchBooks(accessToken), fetchAuthors(accessToken), fetchAreas(accessToken)]);
            setIsLoading(false);
        }

        fetchData();

    }, [accessToken, setIsLoading]);

    const authorsSelectionChangeHandler = (newSelectedAuthors) => {
        //setSelectedAuthors(newSelectedAuthors.filter(author => author));
        console.log(newSelectedAuthors);
    }

    const areasSelectionChangeHandler = (newSelectedAreas) => {
        console.log(newSelectedAreas);
    }

    const findClickHandler = () => {
        
    }

    // const displayBooks = useMemo(() => {
    //     books.filter(book => {
    //         let bookIsCorrect = false;
    //         return book.authors.some(author => selectedAuthors.includes(author))
    //                && book.areas.some(area => selectedAreas.find(selectedArea => selectedArea.cipher === area.cipher));
    //     });
    // }, [books, selectedAuthors, selectedAreas, titleInputRef]);

    return (
        <HeaderLayout>
            <h1 className={classes['page-title']}>Каталог книг</h1>
            <div className="container">
            {!isLoading &&
                <div className={`container text-left ${classes['middle-container']}`}>
                    <p className={classes.paragraph}>Назва:
                        <input className={classes.input} type="text" size="40" ref={titleInputRef} />
                        <button className={classes.btn} onClick={findClickHandler}>Знайти</button>
                    </p>
                    <p className={classes.paragraph}>Жанри:</p>
                    <CheckboxGroup className={classes['checkbox-list']} items={areas.map(area => {
                            return {
                                id: area.cipher,
                                displayValue: area.subjectAreaName
                            }
                        }
                    )} onSelectionChange={areasSelectionChangeHandler} />
                    <p className={classes.paragraph}>Автори:</p>
                    <CheckboxGroup className={classes['checkbox-list']} items={authors.map((author, index) => {
                            return {
                                id: index,
                                displayValue: author
                            }
                        }
                    )} onSelectionChange={authorsSelectionChangeHandler} />
                    <ContentTable columns={bookFields} data={books} />
                </div> }
            </div>
        </HeaderLayout>
    );
}

export default ReaderBooks;