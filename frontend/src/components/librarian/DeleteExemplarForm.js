import { useRef, useState } from 'react';
import classes from './DeleteExemplarForm.module.css';

function DeleteExemplarForm(props) {
    const exemplars = props.exemplars;
    const checkouts = props.checkouts;
    const replacedExemplars = props.replacedExemplars;

    const selectedExemplarRef = useRef();
    const [selectExemplarError, setSelectExemplarError] = useState(null);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedExemplar = Number.parseInt(selectedExemplarRef.current.value);
        let validExemplar = checkouts.filter(checkout => checkout.exemplarInventoryNumber === selectedExemplar).length === 0;
        let message = null;
        if(!validExemplar) {
            message = 'Цей примірник уже взятий читачем, неможливо списати';
        }
        else {
            validExemplar = replacedExemplars.filter(exemplar => exemplar === selectedExemplar).length === 0;
            if(!validExemplar) {
                message = 'Цей примірник списаний, неможливо списати';
            }
        }
        setSelectExemplarError(message);

        if(validExemplar) {
            props.onDeleteExemplar(selectedExemplar);
        }
    }

    return (
        <form name="delete-exemplar-form" className={classes['delete-exemplar-form']} onSubmit={submitFormHandler}>
            <h2>Списати примірник</h2>
            <label>Оберіть примірник:</label>
            <select ref={selectedExemplarRef}>
                {exemplars.map(exemplar => <option key={exemplar} value={exemplar}>{exemplar}</option>)}
            </select>
            {selectExemplarError && <p className={classes.error}>{selectExemplarError}</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Списати примірник" />
        </form>
    );
}

export default DeleteExemplarForm;