import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllAreas } from "../../api/areas";
import { getBooksSummary } from "../../api/books";
import { getOwerReaders, getReadersAndNumberOfReadBooks, getReadersWhoReadAllBooksFromArea, getReadersWhoReadAtLeastOneBooksFromArea, getReadersWhoReadBook } from "../../api/readers";
import AdministratorLayout from "../../components/administrator/AdministratorLayout";
import SelectAreaForm from "../../components/administrator/SelectAreaForm";
import SelectBookForm from "../../components/administrator/SelectBookForm";
import ContentTable from "../../components/layout/ContentTable";
import Modal from "../../components/layout/Modal";

import classes from './AdministratorReaders.module.css';

const readerSummaryFields = ['Номер читацького квитка', 'ПІБ', 'Номери телефону'];
const readerReadBooksFields = ['Номер читацького квитка', 'ПІБ', 'Номери телефону', 'Кількість взятих унікальних книг'];
const owerReaderFields = ['Номер читацького квитка', 'ПІБ', 'Номери телефону', 'Кількість незданих книг, які знаходяться у читача'];

function AdministratorReaders() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [tableContent, setTableContent] = useState({fields: [], content: []});

    const [modalVisible, setModalVisible] = useState(false);
    const [selectBookFormVisible, setSelectBookFormVisible] = useState(false);
    const [selectAreaFormVisible, setSelectAreaFormVisible] = useState(false);
    const [allBooksButtonClicked, setAllBookButtonClicked] = useState(false);

    const [books, setBooks] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const books = await getBooksSummary(accessToken);
                const areas = await getAllAreas(accessToken);
                setBooks(books);
                setAreas(areas);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [accessToken, setBooks, setAreas]);

    const showOwersHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const owerReaders = await getOwerReaders(accessToken);
            const readersForTable = owerReaders.map(reader => {
                return {
                    ticketNumber: reader.ticketNumber,
                    initials: reader.lastName + ' ' + reader.firstName + ' ' + reader.patronymic,
                    phoneNumbers: reader.phoneNumbers.reduce((acc, curr) => acc + ', ' + curr),
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
                    phoneNumbers: reader.phoneNumbers.reduce((acc, curr) => acc + ', ' + curr),
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
                    phoneNumbers: reader.phoneNumbers.reduce((acc, curr) => acc + ', ' + curr),
                }
            });
            setTableContent({fields: readerSummaryFields, content: readersForTable});
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const showReadersReadAllBooksFromAreaHandler = async (areaCipher) => {
        setIsLoading(true);
        try {
            const readers = await getReadersWhoReadAllBooksFromArea(accessToken, areaCipher);
            const readersForTable = readers.map(reader => {
                return {
                    ticketNumber: reader.ticketNumber,
                    initials: reader.lastName + ' ' + reader.firstName + ' ' + reader.patronymic,
                    phoneNumbers: reader.phoneNumbers.reduce((acc, curr) => acc + ', ' + curr),
                }
            });
            setTableContent({fields: readerSummaryFields, content: readersForTable});
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const showReadersReadAtLeastOneBookFromAreaHandler = async (areaCipher) => {
        setIsLoading(true);
        try {
            const readers = await getReadersWhoReadAtLeastOneBooksFromArea(accessToken, areaCipher);
            const readersForTable = readers.map(reader => {
                return {
                    ticketNumber: reader.ticketNumber,
                    initials: reader.lastName + ' ' + reader.firstName + ' ' + reader.patronymic,
                    phoneNumbers: reader.phoneNumbers.reduce((acc, curr) => acc + ', ' + curr),
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

    const showSelectAreaFormForAllBooksHandler = (e) => {
        setModalVisible(true);
        setSelectAreaFormVisible(true);
        setAllBookButtonClicked(true);
    }

    const showSelectAreaFormForAtLeastOneBooksHandler = (e) => {
        setModalVisible(true);
        setSelectAreaFormVisible(true);
        setAllBookButtonClicked(false);
    }

    const hideModalClickHandler = (e) => {
        setModalVisible(false);
        setSelectBookFormVisible(false);
        setSelectAreaFormVisible(false);
        setAllBookButtonClicked(false);
    }

    return (
        <AdministratorLayout>
            <h1 className={classes['page-title']}>Статистика по читачам</h1>
            <div className="container">
                <button className={classes.btn} onClick={showOwersHandler}>Показати боржників</button>
                <button className={classes.btn} onClick={showReadBooksStatisticsHandler}>Для кожного читача показати кількість унікальних книг, яку він взяв у бібліотеці</button>
                <button className={classes.btn} onClick={showSelectBookFormHandler}>Показати читачів, які прочитали задану книгу</button>
                <button className={classes.btn} onClick={showSelectAreaFormForAllBooksHandler}>Показати читачів, які прочитали усі книги із заданої галузі знань</button>
                <button className={classes.btn} onClick={showSelectAreaFormForAtLeastOneBooksHandler}>Показати читачів, які прочитали хоча б одну книгу із заданої галузі знань</button>
            {!isLoading &&
                <ContentTable columns={tableContent.fields} data={tableContent.content} />
            }
            {modalVisible &&
                <Modal onClose={hideModalClickHandler}>
                    {selectBookFormVisible && <SelectBookForm books={books} onSelectBook={showReadersReadChosenBookHandler}/>}
                    {selectAreaFormVisible
                        && <SelectAreaForm areas={areas} 
                                           onSelectArea={allBooksButtonClicked
                                                            ? showReadersReadAllBooksFromAreaHandler
                                                            : showReadersReadAtLeastOneBookFromAreaHandler} />
                    }
                </Modal>
            }
            </div>
        </AdministratorLayout>
    );
}

export default AdministratorReaders;