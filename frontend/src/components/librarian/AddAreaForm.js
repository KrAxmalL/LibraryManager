import { useRef, useState } from 'react';
import { notEmptyString } from '../../utils/validation';
import classes from './AddAreaForm.module.css';

function AddAreaForm(props) {
    const areas = props.areas;

    const cipherRef = useRef();
    const areaNameRef = useRef();

    const [cipherError, setCipherError] = useState(false);
    const [areaNameError, setAreaNameError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const areaCipher = cipherRef.current.value;
        const validCipher = areas.filter(area => area.cipher.localeCompare(areaCipher) === 0).length === 0;
        setCipherError(!validCipher);

        const areaName = areaNameRef.current.value;
        const validAreaName = notEmptyString(areaName);
        setAreaNameError(!validAreaName);

        console.log(areaCipher);
        console.log(areaName);

        if(validCipher && validAreaName) {
            props.onAddArea(areaCipher, areaName);
        }
    }

    return (
        <form name="add-area-form" className={classes['add-area-form']} onSubmit={submitFormHandler}>
            <h2>Додати галузь знань</h2>

            <label>Введіть шифр галузі знань:</label>
            <input className={classes.input} type='text' placeholder="Шифр галузі знань" required
                   ref={cipherRef}></input>
            {cipherError && <p className={classes.error}>Галузь знань із таким шифром уже існує</p>}

            <label>Введіть назву галузі знань:</label>
            <input className={classes.input} type='text' placeholder="Назва галузі знань" required
                   ref={areaNameRef}></input>
            {areaNameError && <p className={classes.error}>Назва галузі знань не може бути порожньою</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Додати галузь" />
        </form>
    );
}

export default AddAreaForm;