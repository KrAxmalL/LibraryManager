import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isbnRegexp, notEmptyString, positiveNumber, priceRegexp, startsWithDigitRegexp } from '../../utils/validation';
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
    const [isbnError, setIsbnError] = useState(null);
    const titleRef = useRef();
    const [titleError, setTitleError] = useState(false);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [areaError, setAreaError] = useState(null);
    const [authorsCount, setAuthorsCount] = useState(0);
    const [authorInputs, setAuthorInputs] = useState([]);
    const [authorsElements, setAuthorsElements] = useState([]);
    const publishingCityRef = useRef();
    const [publishingCityError, setPublishingCityError] = useState(false);
    const publisherRef = useRef();
    const [publisherError, setPublisherError] = useState(false);
    const publishingYearRef = useRef();
    const [publishingYearError, setPublishingYearError] = useState(false);
    const pageNumberRef = useRef();
    const [pageNumberError, setPageNumberError] = useState(false);
    const priceRef = useRef();
    const [priceError, setPriceError] = useState(false);
    const exemplarInventoryNumberRef = useRef();
    const [exemplarInventoryNumberError, setExemplarInventoryNumberError] = useState(null);
    const shelfRef = useRef();
    const [shelfError, setShelfError] = useState(false);

    const authorInputChangeHandler = useCallback((newAuthor, elementIndex) => {
        setAuthorsElements(prevAuthors => {
            console.log("changed author: " + newAuthor);
            return prevAuthors.map((author, index) => index === elementIndex ? newAuthor : author);
        });
    }, []);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const isbn = isbnRef.current.value.trim();
        console.log(isbn);
        let validIsbn = isbnRegexp.test(isbn);
        let isbnErrorText = null;
        if(validIsbn) {
            validIsbn = !books.find(book => book.isbn.localeCompare(isbn) === 0);
            if(!validIsbn) {
                isbnErrorText = "?????????? ?? ?????????? ISBN ?????? ??????????";
            }
        }
        else {
            isbnErrorText ="???????????????????????? ???????????? ISBN";
        }
        setIsbnError(isbnErrorText);

        const title = titleRef.current.value.trim();
        const validTitle = notEmptyString(title);
        setTitleError(!validTitle);

        const validAreas = selectedAreas && selectedAreas.length > 0;
        setAreaError(!validAreas);

        console.log('written authors: ' + JSON.stringify(authorsElements));

        const publishingCity = publishingCityRef.current.value.trim();
        const validPublishingCity = notEmptyString(publishingCity);
        setPublishingCityError(!validPublishingCity);

        const publisher = publisherRef.current.value.trim();
        const validPublisher = notEmptyString(publisher);
        setPublisherError(!validPublisher);

        const publishingYear = Number.parseInt(publishingYearRef.current.value);
        const validPublishingYear = positiveNumber(publishingYear);
        setPublishingYearError(!validPublishingYear);

        const pageNumber = Number.parseInt(pageNumberRef.current.value);
        const validPageNumber = positiveNumber(pageNumber);
        setPageNumberError(!validPageNumber);

        const priceStr = priceRef.current.value;
        const validPrice = priceRegexp.test(priceStr);
        const price = validPrice && Number.parseInt(priceStr);
        setPriceError(!validPrice);

        const exemplarInventoryNumber = Number.parseInt(exemplarInventoryNumberRef.current.value);
        let validExemplarInventoryNumber = positiveNumber(exemplarInventoryNumber);
        let exemplarErrorText = null;
        if(validExemplarInventoryNumber) {
            validExemplarInventoryNumber = !exemplars.find(exemplar => exemplar.inventoryNumber=== exemplarInventoryNumber);
            if(!validExemplarInventoryNumber) {
                exemplarErrorText = "?????????????????? ?? ?????????? ?????????????? ?????? ??????????";
            }
        }
        else {
            exemplarErrorText ="?????????? ???????????????????? ?????? ???????? ???????????????? ????????????";
        }
        setExemplarInventoryNumberError(exemplarErrorText);

        const shelf = shelfRef.current.value.trim();
        const validShelf = notEmptyString(shelf) && startsWithDigitRegexp.test(shelf);
        setShelfError(!validShelf);

        if(validIsbn && validTitle && validAreas && validPublishingCity && validPublisher
            && validPublishingYear && validPageNumber && validPrice && validExemplarInventoryNumber
            && validShelf) {
                props.onAddBook({isbn, title,
                                 areas: selectedAreas.map(area => area.cipher),
                                 authors: authorsElements,
                                 publishingCity, publisher, publishingYear,
                                 pageNumber, price,
                                 exemplarInventoryNumber, shelf}
                                );
        }
    }

    const addAuthorClickHandler = (e) => {
        e.preventDefault();

        setAuthorsCount(prevCount => prevCount + 1);
        const newInput = (
            <input className={classes.input} key={authorsCount} type="text" placeholder="????'?? ????????????"
                required
                onChange={(e) => authorInputChangeHandler(e.target.value, authorsCount)}
            />
        );
        setAuthorInputs(prevInputs => [...prevInputs, newInput]);
        setAuthorsElements(prevElements => [...prevElements, ""]);
    }

    const removeAuthorClickHandler = (e) => {
        e.preventDefault();

        if(authorsCount > 0) {
            setAuthorsCount(prevCount => prevCount - 1);
            setAuthorInputs(prevInputs => prevInputs.filter((_, index) => index !== authorsCount - 1));
            setAuthorsElements(prevElements => prevElements.filter((_, index) => index !== authorsCount - 1));
        }
    }

    const selectedAreasChangeHandler = (newSelectedAreas) => {
        setSelectedAreas(areas.filter((area, index) => newSelectedAreas[index]));
    }

    return (
        <form name="add-book-form" className={classes['add-book-form']} onSubmit={submitFormHandler}>
            <h1 className={classes['form-title']}>???????????? ??????????</h1>
            <input className={classes.input} type='text' placeholder="ISBN(xxx-x-xxxxx-xxx-x)" required ref={isbnRef}></input>
            {isbnError && <p className={classes.error}>{isbnError}</p>}
            <input className={classes.input} type='text' placeholder="??????????" required ref={titleRef}></input>
            {titleError && <p className={classes.error}>?????????? ???? ???????? ???????? ??????????????????</p>}
            <label>?????????????? ??????????:</label>
            <CheckboxGroup className={classes['checkbox-list']} items={areasForCheckboxGroup}
                           onSelectionChange={selectedAreasChangeHandler}/>
            {areaError && <p className={classes.error}>?????????? ?????? ???????? ???????? ?? ???????? ????????</p>}
             <label>?????????????? ??????????????:</label>
            {authorInputs}
            <div>
                <button className={`${classes.input} ${classes.submit}`} onClick={addAuthorClickHandler}>???????????? ????????????</button>
                <button className={`${classes.input} ${classes.submit}`} onClick={removeAuthorClickHandler}>???????????????? ????????????</button>
            </div>
            <input className={classes.input} type="text" placeholder="??????????, ?? ?????????? ????????????" required ref={publishingCityRef}/>
            {publishingCityError && <p className={classes.error}>?????????? ???? ???????? ???????? ????????????????</p>}
            <input className={classes.input} type="text" placeholder="??????????????????????" required ref={publisherRef}/>
            {publisherError && <p className={classes.error}>?????????????????????? ???? ???????? ???????? ????????????????</p>}
            <input className={classes.input} type="number" placeholder="?????? ??????????????" required ref={publishingYearRef}/>
            {publishingYearError && <p className={classes.error}>?????? ?????????????? ?????? ???????? ?????????????? ???? 0</p>}
            <input className={classes.input} type="number" placeholder="?????????????????? ????????????????" required ref={pageNumberRef} />
            {pageNumberError && <p className={classes.error}>?????????????????? ???????????????? ?????? ???????? ?????????????? ???? 0</p>}
            <input className={classes.input} type="text" placeholder="???????? (??????????.xx)" ref={priceRef}/>
            {priceError && <p className={classes.error}>???????????????????????? ???????????? ????????</p>}
            <h2 className={classes['form-sub-title']}>??????????????????</h2>
            <input className={classes.input} type="number" placeholder="?????????????????????? ?????????? ????????????????????" required ref={exemplarInventoryNumberRef}/>
            {exemplarInventoryNumberError && <p className={classes.error}>{exemplarInventoryNumberError}</p>}
            <input className={classes.input} type="text" placeholder="????????????" required ref={shelfRef}/>
            {shelfError && <p className={classes.error}>?????????? ???????????? ?????? ???????????????????? ?? ??????????</p>}
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="???????????? ??????????" />
        </form>
    );
}

export default AddBookForm;