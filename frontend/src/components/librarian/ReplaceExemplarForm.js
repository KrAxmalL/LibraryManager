import { useMemo, useRef, useState } from 'react';
import classes from './ReplaceExemplarForm.module.css';

function ReplaceExemplarForm(props) {
    const exemplars = props.exemplars;
    const checkouts = props.checkouts;

    const selectedExemplarToBeReplacedRef = useRef();
    const selectedExemplarToReplaceRef = useRef();
    const replacementDateRef = useRef();

    const [selectedExemplarToBeReplacedError, setSelectedExemplarToBeReplacedError] = useState(false);
    const [selectedExemplarToReplaceError, setSelectedExemplarToReplaceError] = useState(false);
    const [replacementDateError, setReplacementDateError] = useState(false);
    const [sameExemplarsChosenError, setSameExemplarsChosenError] = useState(false);

    const selectedExemplarToBeReplacedChangeHandler = () => {
        const selectedExemplarToBeReplaced = selectedExemplarToBeReplacedRef.current.value;
        setSelectedExemplarToBeReplacedError(checkouts.filter(checkout => checkout.exemplarInventoryNumber ===
                                                                          Number.parseInt(selectedExemplarToBeReplaced)).length > 0);
    }

    const selectedExemplarToReplaceChangeHandler = () => {
        const selectedExemplarToReplace = selectedExemplarToReplaceRef.current.value;
        setSelectedExemplarToReplaceError(checkouts.filter(checkout => checkout.exemplarInventoryNumber ===
                                                                          Number.parseInt(selectedExemplarToReplace)).length > 0);
    }

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedExemplarToBeReplaced = Number.parseInt(selectedExemplarToBeReplacedRef.current.value);
        const validExemplarToBeReplaced = checkouts.filter(checkout => checkout.exemplarInventoryNumber ===
                                                                       Number.parseInt(selectedExemplarToBeReplaced)).length === 0;
        setSelectedExemplarToBeReplacedError(!validExemplarToBeReplaced);

        const selectedExemplarToReplace = Number.parseInt(selectedExemplarToReplaceRef.current.value);
        const validExemplarToReplace = checkouts.filter(checkout => checkout.exemplarInventoryNumber ===
                                                                    Number.parseInt(selectedExemplarToReplace)).length === 0;
        setSelectedExemplarToReplaceError(!validExemplarToReplace);

        const replacementDate = replacementDateRef.current.value;
        const validReplacementDate = replacementDate !== undefined;
        setReplacementDateError(!validReplacementDate);

        const differentExemplarsChosen = selectedExemplarToBeReplaced !== selectedExemplarToReplace;
        setSameExemplarsChosenError(!differentExemplarsChosen);

        console.log(selectedExemplarToBeReplaced);
        console.log(selectedExemplarToReplace);
        console.log(replacementDate);

        if(validExemplarToBeReplaced && validExemplarToReplace  && validReplacementDate && differentExemplarsChosen) {
            props.onReplaceExemplar(selectedExemplarToBeReplaced, selectedExemplarToReplace, replacementDate);
        }
    }

    return (
        <form name="add-checkout-form" className={classes['add-checkout-form']} onSubmit={submitFormHandler}>
            <h2>Замінити примірник</h2>
            <label>Оберіть примірник, який треба замінити:</label>
            <select ref={selectedExemplarToBeReplacedRef} onChange={selectedExemplarToBeReplacedChangeHandler}>
                {exemplars.map(exemplar => <option key={exemplar} value={exemplar}>{exemplar}</option>)}
            </select>
            {selectedExemplarToBeReplacedError && <p className={classes.error}>Цей примірник перебуває у читача</p>}

            <label>Оберіть примірник, який є заміною:</label>
            <select ref={selectedExemplarToReplaceRef} onChange={selectedExemplarToReplaceChangeHandler}>
                {exemplars.map(exemplar => <option key={exemplar} value={exemplar}>{exemplar}</option>)}
            </select>
            {selectedExemplarToReplaceError && <p className={classes.error}>Цей примірник перебуває у читача</p>}

            <label>Введіть дату заміни:</label>
            <input className={classes.input} type='date' placeholder="Дата початку" required 
                   ref={replacementDateRef}></input>
            {replacementDateError && <p className={classes.error}>Дата заміни</p>}

            {sameExemplarsChosenError && <p className={classes.error}>Обрані примірники мають бути різними</p>}
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Видати книгу"
                   disabled={selectedExemplarToBeReplacedError || selectedExemplarToReplaceError
                             || replacementDateError} />
        </form>
    );
}

export default ReplaceExemplarForm;