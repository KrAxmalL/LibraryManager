import { useRef, useState } from 'react';
import classes from './AddExemplarForm.module.css';

function AddExemplarForm(props) {
    const exemplars = props.exemplars;

    const inventoryNumberRef = useRef();
    const shelfRef = useRef();

    const [inventoryNumberError, setInventoryNumberError] = useState(false);
    const [shelfError, setShelfError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const inventoryNumber = Number.parseInt(inventoryNumberRef.current.value);
        const validInventoryNumber = exemplars.find(exemplar => exemplar.inventoryNumber === inventoryNumber) === undefined;
        setInventoryNumberError(!validInventoryNumber);

        const shelf = shelfRef.current.value;
        const validShelf = shelf !== undefined && shelf.trim().length > 0 && shelf.match(/^\d/);
        setShelfError(!validShelf);

        console.log(inventoryNumber);
        console.log(shelf);

        if(validInventoryNumber && validShelf) {
            props.onExemplarAdd(inventoryNumber, shelf);
        }
    }

    return (
        <form name="add-exemplar-form" className={classes['add-exemplar-form']} onSubmit={submitFormHandler}>
            <h2>Додати примірник</h2>

            <label>Введіть інвентарний номер примірника:</label>
            <input className={classes.input} type='number' placeholder="Інвентарний номер" required
                   ref={inventoryNumberRef}></input>
            {inventoryNumberError && <p className={classes.error}>Примірник із таким номером уже існує</p>}

            <label>Введіть полицю для примірника:</label>
            <input className={classes.input} type='text' placeholder="Полиця" required
                   ref={shelfRef}></input>
            {shelfError && <p className={classes.error}>Номер полиці має починатися з цифри</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Додати примірник" />
        </form>
    );
}

export default AddExemplarForm;