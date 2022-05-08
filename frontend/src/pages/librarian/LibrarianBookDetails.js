import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookDetails } from "../../api/books";
import ContentTable from "../../components/layout/ContentTable";
import LibrarianLayout from "../../components/librarian/LibrarianLayout";

import classes from './LibrarianBookDetails.module.css';

const bookFields = ['ISBN', 'Назва', 'Автори', 'Жанри', 'Місто видання', 'Видавництво', 'Рік видання',
                    'Кількість сторінок', 'Примірники', 'Ціна'];

function LibrarianBookDetails() {

    const params = useParams();

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [book, setBook] = useState([]);

    useEffect(() => {
        const fetchBooks = async() => {
            setIsLoading(true);
            try {
                console.log(accessToken);
                console.log('fetching book details');
                const fetchedBook = await getBookDetails(accessToken, params.bookIsbn);
                console.log(JSON.stringify(fetchedBook));
                setBook([fetchedBook]);
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
                    {!isLoading && <ContentTable columns={bookFields} data={book} />}
                </div>
            </div>
        </LibrarianLayout>
    );
}

export default LibrarianBookDetails;