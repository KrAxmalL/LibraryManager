import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllAreas } from "../../api/areas";
import { getBooksOfAreaWithReadersFromCity, getBooksWhereAllReadersHavePhone, getBooksWithAllAvailableExemplars, getBooksWithPopularity } from "../../api/books";
import AdministratorLayout from "../../components/administrator/AdministratorLayout";
import SelectAreaAndCityForm from "../../components/administrator/SelectAreaAndCityForm";
import SelectPhoneForm from "../../components/administrator/SelectPhoneForm";
import ContentTable from "../../components/layout/ContentTable";
import Modal from "../../components/layout/Modal";
import classes from './AdministratorBooks.module.css';

const bookFields = ['ISBN', 'Назва книги', 'Автори', 'Жанри'];

const bookPopularityFields = ['ISBN', 'Назва книги', 'Автори', 'Жанри', 'Кількість разів, яку книгу брали читачі'];

function AdministratorBooks() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [tableContent, setTableContent] = useState({fields: [], content: []});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectAreaAndCityFormVisible, setSelectAreaAndCityFormVisible] = useState(false);
    const [selectPhoneFormVisible, setSelectPhoneFormVisible] = useState(false);

    const [areas, setAreas] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const areas = await getAllAreas(accessToken);
                setAreas(areas);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [accessToken, setAreas]);

    const showPopularityHandler = async (e) => {
        setIsLoading(true);
        try {
            const booksPopularity = await getBooksWithPopularity(accessToken);
            setTableContent({fields: bookPopularityFields, content: booksPopularity});
        }
        catch(er) {
            console.log(er);
        } finally {
            setIsLoading(false);
        }
    }

    const showBooksAllExemplarsInLibraryHandler = async (e) => {
        setIsLoading(true);
        try {
            const books = await getBooksWithAllAvailableExemplars(accessToken);
            setTableContent({fields: bookFields, content: books});
        }
        catch(er) {
            console.log(er);
        } finally {
            setIsLoading(false);
        }
    }

    const showBooksOfReadersWithPhone = async (phoneNumber) => {
        setIsLoading(true);
        try {
            const books = await getBooksWhereAllReadersHavePhone(accessToken, phoneNumber);
            setTableContent({fields: bookFields, content: books});
        }
        catch(er) {
            console.log(er);
        } finally {
            setIsLoading(false);
        }
    }

    const showBooksOfAreaAndReadersFromCityHandler = async (area, city) => {
        setIsLoading(true);
        try {
            const books = await getBooksOfAreaWithReadersFromCity(accessToken, area, city);
            setTableContent({fields: bookFields, content: books});
        }
        catch(er) {
            console.log(er);
        } finally {
            setIsLoading(false);
        }
    }

    const showSelectAreaAndCityFormHandler = () => {
        setModalVisible(true);
        setSelectAreaAndCityFormVisible(true);
    }

    const showSelectPhoneFormHandler = () => {
        setModalVisible(true);
        setSelectPhoneFormVisible(true);
    }

    const hideModalClickHandler = () => {
        setModalVisible(false);
        setSelectAreaAndCityFormVisible(false);
        setSelectPhoneFormVisible(false);
    }

    return (
        <AdministratorLayout>
            <h1 className={classes['page-title']}>Статистика по книгам</h1>
            <div className="container">
                <button className={classes.btn} onClick={showPopularityHandler}>Показати книги та їх популярність</button>
                <button className={classes.btn} onClick={showBooksAllExemplarsInLibraryHandler}>Показати книги, усі примірники яких знаходяться у бібліотеці</button>
                <button className={classes.btn} onClick={showSelectAreaAndCityFormHandler}>Показати книги, обраної галузі, які читали читачі із обраного міста</button>
                <button className={classes.btn} onClick={showSelectPhoneFormHandler}>Показати книги, які прочитали всі читачі із обраним номером телефону</button>
            {!isLoading &&
                <ContentTable columns={tableContent.fields} data={tableContent.content} />
            }
             {modalVisible &&
                <Modal onClose={hideModalClickHandler}>
                    {selectPhoneFormVisible
                        && <SelectPhoneForm onSelectPhone={showBooksOfReadersWithPhone} />}
                    {selectAreaAndCityFormVisible
                        && <SelectAreaAndCityForm areas={areas}
                                         onSelectAreaAndCity={showBooksOfAreaAndReadersFromCityHandler} />}
                </Modal>
            }
            </div>
        </AdministratorLayout>
    );
}

export default AdministratorBooks;