import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentTable from "../../components/layout/ContentTable";
import HeaderLayout from "../../components/layout/HeaderLayout";

import { getCheckoutsForUser } from "../../api/checkouts";

import classes from './ReaderCheckouts.module.css';
import ReaderLayout from "../../components/reader/ReaderLayout";

const checkoutFields = ['ISBN', 'Книга', 'Примірник', 'Номер видачі', 'Дата видачі', 'Очікувана дата повернення', 'Реальна дата повернення'];

function ReaderCheckouts() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [checkouts, setCheckouts] = useState([]);

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
            try {
                console.log(accessToken);
                console.log('fetching checkouts');
                const fetchedCheckouts = await getCheckoutsForUser(accessToken);
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
        fetchBooks();
    }, [accessToken, setIsLoading]);

    return (
        <ReaderLayout>
            <h1 className={classes['page-title']}>Історія видач</h1>
            <div className="container">
                <div className={`container text-left ${classes['middle-container']}`}>
                    {!isLoading && <ContentTable columns={checkoutFields} data={checkouts} />}
                </div>
            </div>
        </ReaderLayout>
    );
}

export default ReaderCheckouts;