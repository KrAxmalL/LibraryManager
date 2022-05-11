import { useRef, useState } from 'react';
import classes from './SelectBookForm.module.css';

function SelectBookForm(props) {
    const books = props.books;
    const selectedBookRef = useRef();

    const [selectBookError, setSelectBookError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedBook = selectedBookRef.current.value;
        const validSelectedBook = !!selectedBook;
        setSelectBookError(!validSelectedBook)

        if(validSelectedBook) {
            props.onSelectBook(selectedBook);
        }
    }

    return (
        <form name="select-book-form" className={classes['select-book-form']} onSubmit={submitFormHandler}>
            <h2>Оберіть книгу для отримання статистики</h2>
            <label>Оберіть книгу:</label>
            <select ref={selectedBookRef}>
                {books.map(book => <option key={book.isbn} value={book.isbn}>{book.isbn + ', ' + book.title}</option>)}
            </select>
            {selectBookError && <p className={classes.error}>Книга має бути обрана</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Показати статистику" />
        </form>
    );
}

export default SelectBookForm;