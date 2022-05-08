import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookDetails } from "../../api/books";
import { addCheckout, getAllCheckouts } from "../../api/checkouts";
import { getAllReaders } from "../../api/readers";
import ContentTable from "../../components/layout/ContentTable";
import Modal from "../../components/layout/Modal";
import AddCheckoutForm from "../../components/librarian/AddCheckoutForm";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";

import classes from './LibrarianBookDetails.module.css';

const bookFields = ['ISBN', 'Назва', 'Автори', 'Жанри', 'Місто видання', 'Видавництво', 'Рік видання',
                    'Кількість сторінок', 'Примірники', 'Ціна'];

function LibrarianBookDetails() {

    const params = useParams();

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = useState(null);
    const [checkouts, setCheckouts] = useState([]);
    const [readers, setReaders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [addCheckoutFormVisible, setAddCheckoutFormVisible] = useState(false);
    const [addExemplarFormVisible, setAddExemplarFormVisible] = useState(false);
    const [replaceExemplarFormVisible, setReplaceExemplarFormVisible] = useState(false);
    const [editAreasFormVisible, setEditAreasFormVisible] = useState(false);
    const [deleteBookFormVisible, setDeleteBookFormVisible] = useState(false);

    const showAddCheckoutFormHandler = () => {
        setModalVisible(true);
        setAddCheckoutFormVisible(true);
    };

    const showAddExemplarFormHandler = () => {
        setModalVisible(true);
        setAddExemplarFormVisible(true);
    };

    const showReplaceExemplarFormHandler = () => {
        setModalVisible(true);
        setReplaceExemplarFormVisible(true);
    };

    const showEditAreasFormHandler = () => {
        setModalVisible(true);
        setEditAreasFormVisible(true);
    };

    const showDeleteBookFormHandler = () => {
        setModalVisible(true);
        setDeleteBookFormVisible(true);
    };

    const hideModalClickHandler = () => {
        setModalVisible(false);
        setAddCheckoutFormVisible(false);
        setAddExemplarFormVisible(false);
        setReplaceExemplarFormVisible(false);
        setEditAreasFormVisible(false);
        setDeleteBookFormVisible(false);
    };

    const sendAddCheckout = async(exemplarInventoryNumber, readerTicketNumber, startDate, returnDate) => {
        await addCheckout(accessToken, exemplarInventoryNumber, readerTicketNumber, startDate, returnDate);
    }

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
            try {
                console.log(accessToken);
                console.log('fetching book details');
                const fetchedBook = await getBookDetails(accessToken, params.bookIsbn);
                const fetchedCheckouts = await getAllCheckouts(accessToken);
                const fetchedReaders = await getAllReaders(accessToken);

                setBook(fetchedBook);
                setCheckouts(fetchedCheckouts.filter(checkout => checkout.bookIsbn.localeCompare(params.bookIsbn) === 0
                                                                 && checkout.checkoutRealFinishDate === null));
                setReaders(fetchedReaders.map(reader => {
                    return {
                        ticketNumber: reader.ticketNumber,
                        initials: `${reader.lastName} ${reader.firstName} ${reader.patronymic}`,
                        activeCheckouts: fetchedCheckouts.filter(checkout =>
                                    checkout.readerTicketNumber === reader.ticketNumber).length
                    }
                }));
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBooks();
    }, [accessToken, params, setIsLoading]);

    return (
        <LibrarianLayout>
            <h1 className={classes['page-title']}>Книга</h1>
            <div className="container">
                <div className={`container text-left ${classes['middle-container']}`}>
                    {!isLoading && <ContentTable columns={bookFields} data={[book]} />}
                </div>
                <button className={classes.btn} onClick={showAddCheckoutFormHandler}>Видати книгу</button>
                <button className={classes.btn} onClick={showAddExemplarFormHandler}>Додати примірник</button>
                <button className={classes.btn} onClick={showReplaceExemplarFormHandler}>Замінити примірник</button>
                <button className={classes.btn} onClick={showEditAreasFormHandler}>Редагувати жанри</button>
                <button className={classes.btn} onClick={showDeleteBookFormHandler}>Списати книгу</button>
            </div>
            {modalVisible &&
                <Modal onClose={hideModalClickHandler}>
                    {addCheckoutFormVisible && <AddCheckoutForm book={book.isbn} exemplars={book.exemplars}
                                                                readers={readers} checkouts={checkouts}
                                                                onCheckoutAdd={sendAddCheckout}
                                                />}
                </Modal>
            }
        </LibrarianLayout>
    );
}

export default LibrarianBookDetails;