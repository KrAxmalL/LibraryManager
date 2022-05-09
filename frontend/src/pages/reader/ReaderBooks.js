import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentTable from "../../components/layout/ContentTable";
import HeaderLayout from "../../components/layout/HeaderLayout";

import { getAllAuthors, getBooksSummary } from '../../api/books';
import classes from './ReaderBooks.module.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllAreas } from "../../api/areas";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup";
import ReaderLayout from "../../components/reader/ReaderLayout";

const bookFields = ['ISBN', 'Назва', 'Автори', 'Жанри', 'Детальніше'];

const alwaysTrue = () => true;

const bookHasAuthor = (book, authors) => authors.filter(author => book.authors.includes(author)).length > 0;
const bookHasArea = (book, areas) => areas.filter(area => book.areas.includes(area.subjectAreaName)).length > 0;
const bookHasTitle = (book, title) => book.title.toLowerCase().includes(title.toLowerCase());

function ReaderBooks() {

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [displayBooks, setDisplayBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const titleInputRef = useRef();

    const areasForCheckbox = useMemo(() => {
        return areas.map(area => {
                return {
                    id: area.cipher,
                    displayValue: area.subjectAreaName
                }
            }
        )
    }, [areas]);

    const authorsForCheckbox = useMemo(() => {
        return authors.map((author, index) => {
                return {
                    id: index,
                    displayValue: author
                }
            }
        )
    }, [authors]);

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
                setDisplayBooks([...mappedBooks]);
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
        console.log('new selected authors: ' + newSelectedAuthors);
        setSelectedAuthors(authors.filter((author, index) => newSelectedAuthors[index]));
    }

    const areasSelectionChangeHandler = (newSelectedAreas) => {
        console.log('new selected areas: ' + newSelectedAreas);
        setSelectedAreas(areas.filter((area, index) => newSelectedAreas[index]));
    }

    const findClickHandler = () => {
        console.log('authors to find: ' + JSON.stringify(selectedAuthors));
        console.log('areas to find: ' + JSON.stringify(selectedAreas));

        const title = titleInputRef.current.value.trim();

        const hasTitle = title.length === 0
                            ? alwaysTrue
                            : bookHasTitle;

        const hasAuthor = selectedAuthors.length === 0
                                ? alwaysTrue
                                : bookHasAuthor;

        const hasArea = selectedAreas.length === 0 
                                ? alwaysTrue
                                : bookHasArea

        setDisplayBooks(books.filter(book => hasTitle(book, title) && hasArea(book, selectedAreas)
                                             && hasAuthor(book, selectedAuthors))
                        );
    }

    return (
        <ReaderLayout>
            <h1 className={classes['page-title']}>Каталог книг</h1>
            <div className="container">
            {!isLoading &&
                <div className={`container text-left ${classes['middle-container']}`}>
                    <p className={classes.paragraph}>Назва:
                        <input className={classes.input} type="text" ref={titleInputRef} />
                        <button className={classes.btn} onClick={findClickHandler}>Знайти</button>
                    </p>
                    <p className={classes.paragraph}>Жанри:</p>
                    <CheckboxGroup className={classes['checkbox-list']} items={areasForCheckbox} 
                                   onSelectionChange={areasSelectionChangeHandler} />
                    <p className={classes.paragraph}>Автори:</p>
                    <CheckboxGroup className={classes['checkbox-list']} items={authorsForCheckbox} 
                                   onSelectionChange={authorsSelectionChangeHandler} />
                    <ContentTable columns={bookFields} data={displayBooks} />
                </div> }
            </div>
        </ReaderLayout>
    );
}

export default ReaderBooks;