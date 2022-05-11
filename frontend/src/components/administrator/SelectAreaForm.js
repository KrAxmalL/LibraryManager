import { useRef, useState } from 'react';
import classes from './SelectAreaForm.module.css';

function SelectAreaForm(props) {
    const areas = props.areas;
    const selectedAreaRef = useRef();

    const [selectAreaError, setSelectAreaError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedArea = selectedAreaRef.current.value;
        const validSelectedArea = !!selectedArea;
        setSelectAreaError(!validSelectedArea)

        if(validSelectedArea) {
            props.onSelectArea(selectedArea);
        }
    }

    return (
        <form name="select-area-form" className={classes['select-area-form']} onSubmit={submitFormHandler}>
            <h2>Оберіть галузь знань для отримання статистики</h2>
            <label>Оберіть галузь:</label>
            <select ref={selectedAreaRef}>
                {areas.map(area => <option key={area.cipher} value={area.cipher}>{area.cipher + ', ' + area.subjectAreaName}</option>)}
            </select>
            {selectAreaError && <p className={classes.error}>Галузь має бути обрана</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Показати статистику" />
        </form>
    );
}

export default SelectAreaForm;