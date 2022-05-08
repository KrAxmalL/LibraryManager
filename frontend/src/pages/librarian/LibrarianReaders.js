import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllReaders } from "../../api/readers";
import ContentTable from "../../components/layout/ContentTable";
import Layout from "../../components/layout/Layout";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";

import classes from './LibrarianReaders.module.css';

const readerFields = ['Номер читацького квитка', 'Прізвище', `Ім'я`, 'По-батькові', 'Номери телефону', 'Дата народження',
                      'Місто', 'Вулиця', 'Будинок', 'Квартира', 'Місце роботи', 'Дії'];

function LibrarianReaders() {

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [readers, setReaders] = useState([]);

    useEffect(() => {
        const fetchReaders = async() => {
            try {
                setIsLoading(true);
                console.log(accessToken);
                console.log('fetching readers');
                const fetchedReaders = await getAllReaders(accessToken);
                const mappedReaders = fetchedReaders.map(reader => {return {
                    ...reader,
                    homeFlatNumber: reader.homeFlatNumber || 'Приватний будинок',
                    actions: <button className={classes.btn}>Закрити абонемент</button>
                }})
                setReaders(mappedReaders);
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
            </div>
        </LibrarianLayout>
    );
}

export default LibrarianReaders;