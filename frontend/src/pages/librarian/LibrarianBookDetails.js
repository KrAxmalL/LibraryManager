import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNewArea, getAllAreas } from "../../api/areas";
import { deleteBook, getBookDetails, setAreasForBook } from "../../api/books";
import { addCheckout, getAllCheckouts } from "../../api/checkouts";
import { addExemplar, getAllExemplars, replaceExemplar } from "../../api/exemplars";
import { getAllReaders } from "../../api/readers";
import { getAllReplacementActs } from "../../api/replacementActs";
import ContentTable from "../../components/layout/ContentTable";
import Modal from "../../components/layout/Modal";
import AddAreaForm from "../../components/librarian/AddAreaForm";
import AddCheckoutForm from "../../components/librarian/AddCheckoutForm";
import AddExemplarForm from "../../components/librarian/AddExemplarForm";
import DeleteBookForm from "../../components/librarian/DeleteBookForm";
import EditAreasForm from "../../components/librarian/EditAreasForm";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";
import ReplaceExemplarForm from "../../components/librarian/ReplaceExemplarForm";

import classes from './LibrarianBookDetails.module.css';

const bookFields = ['ISBN', 'Назва', 'Автори', 'Жанри', 'Місто видання', 'Видавництво', 'Рік видання',
                    'Кількість сторінок', 'Примірники', 'Ціна'];

function LibrarianBookDetails() {

    const params = useParams();
    const navigate  = useNavigate();

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = useState(null);
    const [areas, setAreas] = useState([]);
    const [checkouts, setCheckouts] = useState([]);
    const [readers, setReaders] = useState([]);
    const [exemplars, setExemplars] = useState([]);
    const [replacedExemplars, setReplacedExemplars] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [addAreaFormVisible, setAddAreaFormVisible] = useState(false);
    const [addCheckoutFormVisible, setAddCheckoutFormVisible] = useState(false);
    const [addExemplarFormVisible, setAddExemplarFormVisible] = useState(false);
    const [replaceExemplarFormVisible, setReplaceExemplarFormVisible] = useState(false);
    const [editAreasFormVisible, setEditAreasFormVisible] = useState(false);
    const [deleteBookFormVisible, setDeleteBookFormVisible] = useState(false);

    const bookToDisplay = useMemo(() => {
        if(book) {
            const bookExemplarsToDisplay = book.exemplars.map(exemplar => {
                return replacedExemplars.includes(exemplar)
                            ? `${exemplar} (замінений)`
                            : `${exemplar}`;
            });
            return {...book, exemplars: bookExemplarsToDisplay}
        }
        return book;
    }, [book, replacedExemplars]);

    const showAddAreaFormHandler = () => {
        setModalVisible(true);
        setAddAreaFormVisible(true);
    }

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
        setAddAreaFormVisible(false);
        setAddCheckoutFormVisible(false);
        setAddExemplarFormVisible(false);
        setReplaceExemplarFormVisible(false);
        setEditAreasFormVisible(false);
        setDeleteBookFormVisible(false);
    };

    const sendAddArea = async(areaCipher, areaName) => {
        await addNewArea(accessToken, {cipher: areaCipher, subjectAreaName: areaName});
    }

    const sendAddCheckout = async(exemplarInventoryNumber, readerTicketNumber, startDate, returnDate) => {
        await addCheckout(accessToken, exemplarInventoryNumber, readerTicketNumber, startDate, returnDate);
    }

    const sendAddExemplar = async(inventoryNumber, shelf) => {
        await addExemplar(accessToken, book.isbn, inventoryNumber, shelf);
    }

    const sendReplaceExemplar = async(exemplarToBeReplaced, exemplarToReplace, replacementDate) => {
        await replaceExemplar(accessToken, exemplarToBeReplaced, exemplarToReplace, replacementDate);
    }

    const sendEditAreas = async(areas) => {
        await setAreasForBook(accessToken, book.isbn, areas.map(area => area.cipher));
    }

    const sendDeleteBook = async() => {
        await deleteBook(accessToken, book.isbn);
        navigate({
            pathname: '/librarian/books'
        })
    }

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
            try {
                console.log(accessToken);
                console.log('fetching book details');
                const fetchedBook = await getBookDetails(accessToken, params.bookIsbn);
                const fetchedAreas = await getAllAreas(accessToken);
                const fetchedCheckouts = await getAllCheckouts(accessToken);
                const fetchedReaders = await getAllReaders(accessToken);
                const fetchedExemplars = await getAllExemplars(accessToken);
                const fetchedReplacementActs = await getAllReplacementActs(accessToken);

                const bookCheckouts = fetchedCheckouts.filter(checkout => checkout.bookIsbn.localeCompare(params.bookIsbn) === 0
                                                                          && checkout.checkoutRealFinishDate === null);
                setCheckouts(bookCheckouts);
                setReaders(fetchedReaders.map(reader => {
                    return {
                        ticketNumber: reader.ticketNumber,
                        initials: `${reader.lastName} ${reader.firstName} ${reader.patronymic}`,
                        activeCheckouts: fetchedCheckouts.filter(checkout =>
                                    checkout.readerTicketNumber === reader.ticketNumber).length
                    }
                }));
                setExemplars(fetchedExemplars);
                const replacedExemplars = fetchedReplacementActs.map(act => act.replacedExemplarInventoryNumber);
                setReplacedExemplars(replacedExemplars);
                setBook(fetchedBook);
                setAreas(fetchedAreas);
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
                    {!isLoading && <ContentTable columns={bookFields} data={[bookToDisplay]} />}
                </div>
                <button className={classes.btn} onClick={showAddAreaFormHandler}>Додати галузь знань</button>
                <button className={classes.btn} onClick={showAddCheckoutFormHandler}>Видати книгу</button>
                <button className={classes.btn} onClick={showAddExemplarFormHandler}>Додати примірник</button>
                <button className={classes.btn} onClick={showReplaceExemplarFormHandler}>Замінити примірник</button>
                <button className={classes.btn} onClick={showEditAreasFormHandler}>Редагувати жанри</button>
                <button className={classes.btn} onClick={showDeleteBookFormHandler}>Списати книгу</button>
            </div>
            {modalVisible &&
                <Modal onClose={hideModalClickHandler}>
                    {addAreaFormVisible && <AddAreaForm areas={areas} onAddArea={sendAddArea}/>}
                    {addCheckoutFormVisible && <AddCheckoutForm book={book.isbn} exemplars={book.exemplars}
                                                                replacedExemplars={replacedExemplars}
                                                                readers={readers} checkouts={checkouts}
                                                                onCheckoutAdd={sendAddCheckout}
                                                />}
                    {addExemplarFormVisible && <AddExemplarForm exemplars={exemplars} onExemplarAdd={sendAddExemplar}/>}
                    {replaceExemplarFormVisible && <ReplaceExemplarForm exemplars={book.exemplars} checkouts={checkouts}
                                                                        replacedExemplars={replacedExemplars}
                                                                        onReplaceExemplar={sendReplaceExemplar}/>}
                    {editAreasFormVisible && <EditAreasForm areas={areas} bookAreas={book.areas} onEditAreas={sendEditAreas} />}
                    {deleteBookFormVisible && <DeleteBookForm book={{title: book.title, activeCheckouts: checkouts.length}}
                                                              onDeleteBook={sendDeleteBook} />}
                </Modal>
            }
        </LibrarianLayout>
    );
}

export default LibrarianBookDetails;