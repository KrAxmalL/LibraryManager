import { useMemo, useRef, useState } from 'react';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import classes from './AddBookForm.module.css';

function AddBookForm(props) {

    const books = props.books;
    const exemplars = props.exemplars;
    const areas = props.areas;

    const areasForCheckboxGroup = useMemo(() => {
        return areas.map(area => {
            return {
                id: area.cipher,
                displayValue: area.subjectAreaName
            }
        });
    }, [areas]);

    const isbnRef = useRef();
    const titleRef = useRef();
    const authorsCountRef = useRef();
    const publishingCityRef = useRef();
    const publisherRef = useRef();
    const publishingYearRef = useRef();
    const pageNumberRef = useRef();
    const priceRef = useRef();
    const exemplarInventoryNumberRef = useRef();
    const shelfRef = useRef();

    const submitFormHandler = (e) => {
        e.preventDefault();

    }

    const selectedAreasChangeHandler = (newSelectedAreas) => {

    }

    return (
        <form name="add-book-form" className={classes['add-book-form']} onSubmit={submitFormHandler}>
            <h1 className={classes['form-title']}>Додати книгу</h1>
            <input className={classes.input} type='text' placeholder="ISBN(xxx-x-xxxxx-xxx-x)" required ref={isbnRef}></input>
            <input className={classes.input} type='text' placeholder="Назва" required ref={titleRef}></input>
            <label>Оберіть жанри:</label>
            <CheckboxGroup className={classes['checkbox-list']} items={areasForCheckboxGroup}
                           onSelectionChange={selectedAreasChangeHandler}/>
            <input className={classes.input} type="number" placeholder="Кількість авторів" required ref={authorsCountRef}/>
            <input className={classes.input} type="text" placeholder="Автори" required />
            <input className={classes.input} type="text" placeholder="Місто, у якому видана" required ref={publishingCityRef}/>
            <input className={classes.input} type="text" placeholder="Видавництво" required ref={publisherRef}/>
            <input className={classes.input} type="number" placeholder="Рік видання" required ref={publishingYearRef}/>
            <input className={classes.input} type="number" placeholder="Кількість сторінок" required ref={pageNumberRef} />
            <input className={classes.input} type="text" placeholder="Ціна" ref={priceRef}/>
            <h2 className={classes['form-sub-title']}>Примірник</h2>
            <input className={classes.input} type="number" placeholder="Інвентарний номер примірника" required ref={exemplarInventoryNumberRef}/>
            <input className={classes.input} type="text" placeholder="Полиця" required ref={shelfRef}/>
            <input  className={`${classes.input} ${classes.submit}`} type="submit" value="Додати книгу" />
        </form>
    );
}

export default AddBookForm;