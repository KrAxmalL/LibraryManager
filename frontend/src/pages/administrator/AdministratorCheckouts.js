import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCheckouts } from "../../api/checkouts";
import AdministratorLayout from "../../components/administrator/AdministratorLayout";
import ContentTable from "../../components/layout/ContentTable";

import classes from './AdministratorCheckouts.module.css';

const checkoutFields = ['Номер квитка читача', 'ПІБ читача','ISBN', 'Книга', 'Примірник', 'Номер видачі',
                        'Дата видачі', 'Очікувана дата повернення', 'Реальна дата повернення'];

function AdministratorCheckouts() {
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
                const checkoutsToDisplay = fetchedCheckouts.map(checkout => {
                                    return {
                                        ...checkout,
                                        checkoutRealFinishDate: checkout.checkoutRealFinishDate
                                                                || 'Книга ще у читача'
                                    }
                });
                setCheckouts(checkoutsToDisplay);
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCheckouts();
    }, [accessToken, setIsLoading]);

    return (
        <AdministratorLayout>
            <h1 className={classes['page-title']}>Історія видач</h1>
            <div className="container">
                <div className={`container text-left ${classes['middle-container']}`}>
                    {!isLoading && <ContentTable columns={checkoutFields}
                                                 data={checkouts} />
                    }
                </div>
            </div>
        </AdministratorLayout>
    );
}

export default AdministratorCheckouts;