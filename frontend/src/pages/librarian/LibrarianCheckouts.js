import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCheckouts } from "../../api/checkouts";
import ContentTable from "../../components/layout/ContentTable";
import Layout from "../../components/layout/Layout";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";

import classes from './LibrarianCheckouts.module.css';

const checkoutFields = ['Номер квитка читача', 'ПІБ читача','ISBN', 'Книга', 'Примірник', 'Номер видачі',
                        'Дата видачі', 'Очікувана дата повернення', 'Реальна дата повернення'];

function LibrarianCheckouts() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [checkouts, setCheckouts] = useState([]);

    useEffect(() => {
        const fetchCheckouts = async() => {
            setIsLoading(true);
            try {
                console.log(accessToken);
                console.log('fetching checkouts');
                const fetchedCheckouts = await getAllCheckouts(accessToken);
                const mappedCheckouts = fetchedCheckouts.map(checkout => {
                    let content;
                    if(checkout.checkoutRealFinishDate) {
                        content = checkout.checkoutRealFinishDate;
                    }
                    else {
                        content = (
                            <React.Fragment>
                                <p>Книга ще у читача</p>
                                <button className={classes.btn}>Продовжити</button>
                                <button className={classes.btn}>Прийняти книгу</button>
                            </React.Fragment>
                        );
                    }
                    return {
                        ...checkout,
                        checkoutRealFinishDate: content
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
            </div>
        </LibrarianLayout>
    );
}

export default LibrarianCheckouts;