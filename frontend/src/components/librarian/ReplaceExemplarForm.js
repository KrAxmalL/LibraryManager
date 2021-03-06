import { useMemo, useRef, useState } from 'react';
import classes from './ReplaceExemplarForm.module.css';

function ReplaceExemplarForm(props) {
    const exemplars = props.exemplars;
    const checkouts = props.checkouts;
    const replacedExemplars = props.replacedExemplars;

    const selectedExemplarToBeReplacedRef = useRef();
    const selectedExemplarToReplaceRef = useRef();
    const replacementDateRef = useRef();

    const [selectedExemplarToBeReplacedError, setSelectedExemplarToBeReplacedError] = useState(null);
    const [selectedExemplarToReplaceError, setSelectedExemplarToReplaceError] = useState(null);
    const [replacementDateError, setReplacementDateError] = useState(false);
    const [sameExemplarsChosenError, setSameExemplarsChosenError] = useState(false);

    const selectedExemplarToBeReplacedChangeHandler = () => {
        const selectedExemplarToBeReplaced = Number.parseInt(selectedExemplarToBeReplacedRef.current.value);
        let isTaken = checkouts.filter(checkout => checkout.exemplarInventoryNumber ===
                                                         selectedExemplarToBeReplaced).length > 0
        let message = null;
        if(isTaken) {
            message = 'Цей примірник уже взятий іншим читачем';
        }
        else {
            isTaken = replacedExemplars.filter(exemplar => exemplar === selectedExemplarToBeReplaced).length > 0;
            if(isTaken) {
                message = 'Цей примірник списаний, неможливо видати';
            }
        }
        setSelectedExemplarToBeReplacedError(message);
    }

    const selectedExemplarToReplaceChangeHandler = () => {
        const selectedExemplarToReplace = Number.parseInt(selectedExemplarToReplaceRef.current.value);
        let isTaken = checkouts.filter(checkout => checkout.exemplarInventoryNumber ===
            selectedExemplarToReplace).length > 0
        let message = null;
        if(isTaken) {
            message = 'Цей примірник уже взятий іншим читачем';
        }
        else {
            isTaken = replacedExemplars.filter(exemplar => exemplar === selectedExemplarToReplace).length > 0;
            if(isTaken) {
                message = 'Цей примірник списаний, неможливо видати';
            }
        }
        setSelectedExemplarToReplaceError(message);
    }

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedExemplarToBeReplaced = Number.parseInt(selectedExemplarToBeReplacedRef.current.value);
        let validExemplarToBeReplaced = checkouts.filter(checkout => checkout.exemplarInventoryNumber ===
                                                            selectedExemplarToBeReplaced).length === 0
        let toBeReplacedMessage = null;
        if(!validExemplarToBeReplaced) {
            toBeReplacedMessage = 'Цей примірник уже взятий іншим читачем';
        }
        else {
            validExemplarToBeReplaced = replacedExemplars.filter(exemplar => exemplar ===
                                                            selectedExemplarToBeReplaced).length === 0;
            if(!validExemplarToBeReplaced) {
                toBeReplacedMessage = 'Цей примірник списаний, неможливо видати';
            }
        }
        setSelectedExemplarToBeReplacedError(toBeReplacedMessage);

        const selectedExemplarToReplace = Number.parseInt(selectedExemplarToReplaceRef.current.value);
        let validExemplarToReplace = checkouts.filter(checkout => checkout.exemplarInventoryNumber ===
                                                            selectedExemplarToReplace).length === 0
        let replaceMessage = null;
        if(!validExemplarToReplace) {
            replaceMessage = 'Цей примірник уже взятий іншим читачем';
        }
        else {
            validExemplarToReplace = replacedExemplars.filter(exemplar => exemplar ===
                                                            selectedExemplarToReplace).length === 0;
            if(!validExemplarToReplace) {
                replaceMessage = 'Цей примірник списаний, неможливо видати';
            }
        }
        setSelectedExemplarToReplaceError(replaceMessage);

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
            {selectedExemplarToBeReplacedError && <p className={classes.error}>{selectedExemplarToBeReplacedError}</p>}

            <label>Оберіть примірник, який є заміною:</label>
            <select ref={selectedExemplarToReplaceRef} onChange={selectedExemplarToReplaceChangeHandler}>
                {exemplars.map(exemplar => <option key={exemplar} value={exemplar}>{exemplar}</option>)}
            </select>
            {selectedExemplarToReplaceError && <p className={classes.error}>{selectedExemplarToReplaceError}</p>}

            <label>Введіть дату заміни:</label>
            <input className={classes.input} type='date' placeholder="Дата початку" required 
                   ref={replacementDateRef}></input>
            {replacementDateError && <p className={classes.error}>Дата заміни</p>}

            {sameExemplarsChosenError && <p className={classes.error}>Обрані примірники мають бути різними</p>}
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Замінити примірник"
                   disabled={selectedExemplarToBeReplacedError || selectedExemplarToReplaceError
                             || replacementDateError} />
        </form>
    );
}

export default ReplaceExemplarForm;