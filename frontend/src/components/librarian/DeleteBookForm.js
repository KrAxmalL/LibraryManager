import { useRef, useState } from 'react';
import classes from './DeleteBookForm.module.css';

function DeleteBookForm(props) {
    const book = props.book;
    const activeCheckouts = book.activeCheckouts;

    const submitFormHandler = (e) => {
        e.preventDefault();
        props.onDeleteBook();
    }

    return (
        <form name="delete-book-form" className={classes['delete-book-form']} onSubmit={submitFormHandler}>
            <h2>{`Списати книгу "${book.title}"`}</h2>
            <label>Підтвердіть списання книги:</label>
            {activeCheckouts > 0 &&
                <p className={classes.error}>
                    {`Кількість примірників, які знаходяться у читачів: ${activeCheckouts}, не можна списати книгу`}
                    </p>
            }
            {activeCheckouts === 0 &&
                <p className={classes['can-delete']}>
                    Усі екземпляри книги знаходяться у бібліотеці, можна списати
                </p>
            }
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Списати книгу"
                   disabled={activeCheckouts > 0} />
        </form>
    );
}

export default DeleteBookForm;