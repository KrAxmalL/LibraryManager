import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { deleteReader, getAllReaders } from "../../api/readers";
import ContentTable from "../../components/layout/ContentTable";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/layout/Modal";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";
import DeleteReaderForm from "../../components/librarian/DeleteReaderForm";

import classes from './LibrarianReaders.module.css';
import { getAllCheckouts } from "../../api/checkouts";

const readerFields = ['Номер читацького квитка', 'Прізвище', `Ім'я`, 'По-батькові', 'Номери телефону', 'Дата народження',
                      'Місто', 'Вулиця', 'Будинок', 'Квартира', 'Місце роботи'];

function LibrarianReaders() {

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [readers, setReaders] = useState([]);
    const [checkouts, setCheckouts] = useState([]);
    const [deleteFormVisible, setDeleteFormVisible] = useState(false);

    const readersToDelete = useMemo(() => readers.map(reader => {
        return {
            ticketNumber: reader.ticketNumber,
            initials: `${reader.lastName} ${reader.firstName} ${reader.patronymic}`,
            activeCheckouts: checkouts.filter(checkout => checkout.readerTicketNumber === reader.ticketNumber
                                                          && checkout.checkoutRealFinishDate === null).length
        }
    }), [readers, checkouts]);

    const showDeleteFormHandler = () => {
        setDeleteFormVisible(true);
    }

    const hideDeleteFormHandler = () => {
        setDeleteFormVisible(false);
    }

    const sendDeleteReader = async (readerTicketNumber) => {
        await deleteReader(accessToken, readerTicketNumber);
    }

    useEffect(() => {
        const fetchReaders = async() => {
            try {
                setIsLoading(true);
                console.log(accessToken);
                console.log('fetching readers');
                const fetchedReaders = await getAllReaders(accessToken);
                const fetchedCheckouts = await getAllCheckouts(accessToken);
                const mappedReaders = fetchedReaders.map(reader => {
                    return {
                        ...reader,
                        homeFlatNumber: reader.homeFlatNumber || 'Приватний будинок'
                    }
                });
                setReaders(mappedReaders);
                setCheckouts(fetchedCheckouts);
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchReaders();
    }, [accessToken, setReaders]);

    return (
        <LibrarianLayout>
            <h1 className={classes['page-title']}>Список читачів</h1>
            <div className="container">
            {!isLoading &&
                <ContentTable columns={readerFields} data={readers} />
            }
                <button className={classes.btn} onClick={showDeleteFormHandler}>Закрити абонемент</button>
            </div>
            {deleteFormVisible &&
                <Modal onClose={hideDeleteFormHandler}>
                    <DeleteReaderForm onReaderSelected={sendDeleteReader} readers={readersToDelete}></DeleteReaderForm>
                </Modal>
            }
        </LibrarianLayout>
    );
}

export default LibrarianReaders;