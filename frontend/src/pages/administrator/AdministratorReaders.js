import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBooksSummary } from "../../api/books";
import { getOwerReaders, getReadersAndNumberOfReadBooks, getReadersWhoReadBook } from "../../api/readers";
import AdministratorLayout from "../../components/administrator/AdministratorLayout";
import SelectBookForm from "../../components/administrator/SelectBookForm";
import ContentTable from "../../components/layout/ContentTable";
import Modal from "../../components/layout/Modal";

import classes from './AdministratorReaders.module.css';

const readerSummaryFields = ['Номер читацького квитка', 'ПІБ'];
const readerReadBooksFields = ['Номер читацького квитка', 'ПІБ', 'Кількість взятих унікальних книг'];
const owerReaderFields = ['Номер читацького квитка', 'ПІБ', 'Кількість незданих книг, які знаходяться у читача'];

function AdministratorReaders() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [tableContent, setTableContent] = useState({fields: [], content: []});

    const [modalVisible, setModalVisible] = useState(false);
    const [selectBookFormVisible, setSelectBookFormVisible] = useState(false);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async() => {
            try {
                const books = await getBooksSummary(accessToken);
                setBooks(books);
            } catch (e) {
                console.log(e);
            }
        }
        fetchBooks();
    }, [accessToken, setBooks]);

    const showOwersHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const owerReaders = await getOwerReaders(accessToken);
            const readersForTable = owerReaders.map(reader => {
                return {
                    ticketNumber: reader.ticketNumber,
                    initials: reader.lastName + ' ' + reader.firstName + ' ' + reader.patronymic,
                    debtBooks: reader.debtBooks
                }
            });
            setTableContent({fields: owerReaderFields, content: readersForTable});
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const showReadBooksStatisticsHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const readers = await getReadersAndNumberOfReadBooks(accessToken);
            const readersForTable = readers.map(reader => {
                return {
                    ticketNumber: reader.ticketNumber,
                    initials: reader.lastName + ' ' + reader.firstName + ' ' + reader.patronymic,
                    readBooks: reader.readBooks
                }
            });
            setTableContent({fields: readerReadBooksFields, content: readersForTable});
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const showReadersReadChosenBookHandler = async (bookIsbn) => {
        setIsLoading(true);
        try {
            const readers = await getReadersWhoReadBook(accessToken, bookIsbn);
            const readersForTable = readers.map(reader => {
                return {
                    ticketNumber: reader.ticketNumber,
                    initials: reader.lastName + ' ' + reader.firstName + ' ' + reader.patronymic,
                }
            });
            setTableContent({fields: readerSummaryFields, content: readersForTable});
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const showSelectBookFormHandler = (e) => {
        setModalVisible(true);
        setSelectBookFormVisible(true);
    }

    const hideModalClickHandler = (e) => {
        setModalVisible(false);
        setSelectBookFormVisible(false);
    }

    return (
        <AdministratorLayout>
            <h1 className={classes['page-title']}>Статистика по книгам</h1>
            <div className="container">
                <button className={classes.btn} onClick={showOwersHandler}>Показати боржників</button>
                <button className={classes.btn} onClick={showReadBooksStatisticsHandler}>Для кожного читача показати кількість унікальних книг, яку він взяв у бібліотеці</button>
                <button className={classes.btn} onClick={showSelectBookFormHandler}>Показати читачів, які прочитали задану книгу</button>
                <button className={classes.btn}>Показати читачів, які прочитали усі книги заданої галузі знань</button>
            {!isLoading &&
                <ContentTable columns={tableContent.fields} data={tableContent.content} />
            }
            {modalVisible &&
                <Modal onClose={hideModalClickHandler}>
                    {selectBookFormVisible && <SelectBookForm books={books} onSelectBook={showReadersReadChosenBookHandler}/>}
                </Modal>
            }
            </div>
        </AdministratorLayout>
    );
}

export default AdministratorReaders;