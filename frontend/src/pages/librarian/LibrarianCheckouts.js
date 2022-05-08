import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { continueCheckout, finishCheckout, getAllCheckouts } from "../../api/checkouts";
import ContentTable from "../../components/layout/ContentTable";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/layout/Modal";
import ContinueCheckoutForm from "../../components/librarian/ContinueCheckoutForm";
import FinishCheckoutForm from "../../components/librarian/FinishCheckoutForm";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";

import classes from './LibrarianCheckouts.module.css';

const checkoutFields = ['Номер квитка читача', 'ПІБ читача','ISBN', 'Книга', 'Примірник', 'Номер видачі',
                        'Дата видачі', 'Очікувана дата повернення', 'Реальна дата повернення'];

function LibrarianCheckouts() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [checkouts, setCheckouts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [continueFormVisible, setContinueFormVisible] = useState(false);
    const [finishFormVisible, setFinishFormVisible] = useState(false);

    const checkoutForContinueCheckout = checkouts.map(checkout => {
        return {
            checkoutNumber: checkout.checkoutNumber,
            checkoutExpectedFinishDate: checkout.checkoutExpectedFinishDate
        }}
    );

    const checkoutForFinishCheckout = checkouts.map(checkout => {
        return {
            checkoutNumber: checkout.checkoutNumber,
            checkoutRealFinishDate: checkout.checkoutRealFinishDate
        }}
    );

    const continueClickHandler = (e) => {
        setContinueFormVisible(true);
        setModalVisible(true);
    }

    const finishClickHandler = () => {
        setFinishFormVisible(true);
        setModalVisible(true);
    }

    const hideModalClickHandler = (e) => {
        setModalVisible(false);
        setContinueFormVisible(false);
        setFinishFormVisible(false);
    }

    const sendContinueCheckout = async(checkoutNumber, newDate) => {
        await continueCheckout(accessToken, checkoutNumber, newDate);
    }

    const sendFinishCheckout = async(checkoutNumber, newDate, newShelf) => {
        await finishCheckout(accessToken, checkoutNumber, newDate, newShelf);
    }

    useEffect(() => {
        const fetchCheckouts = async() => {
            setIsLoading(true);
            try {
                console.log(accessToken);
                console.log('fetching checkouts');
                const fetchedCheckouts = await getAllCheckouts(accessToken);
                const mappedCheckouts = fetchedCheckouts.map(checkout => {
                    return {
                        ...checkout,
                        checkoutRealFinishDate: checkout.checkoutRealFinishDate || 'Книга ще у читача'
                    }
                })
                setCheckouts(mappedCheckouts);
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCheckouts();
    }, [accessToken, setIsLoading]);

    return (
        <LibrarianLayout>
            <h1 className={classes['page-title']}>Історія видач</h1>
            <div className="container">
                <div className={`container text-left ${classes['middle-container']}`}>
                    {!isLoading && <ContentTable columns={checkoutFields} data={checkouts} />}
                </div>
                <button className={classes.btn} onClick={continueClickHandler}>Продовжити</button>
                <button className={classes.btn} onClick={finishClickHandler}>Прийняти книгу</button>
                {modalVisible &&
                    <Modal onClose={hideModalClickHandler}>
                        {continueFormVisible && <ContinueCheckoutForm checkouts={checkoutForContinueCheckout}
                                                                      onContinueDateSelected={sendContinueCheckout}/>}
                        {finishFormVisible && <FinishCheckoutForm checkouts={checkoutForFinishCheckout}
                                                                  onFinishDateSelected={sendFinishCheckout}/>}
                    </Modal>
                }
            </div>
        </LibrarianLayout>
    );
}

export default LibrarianCheckouts;