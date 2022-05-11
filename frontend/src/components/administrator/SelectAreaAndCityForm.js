import { useRef, useState } from 'react';
import { notEmptyString } from '../../utils/validation';
import classes from './SelectAreaAndCityForm.module.css';

function SelectAreaAndCityForm(props) {
    const areas = props.areas;

    const selectedAreaRef = useRef();
    const cityInputRef = useRef();

    const [selectAreaError, setSelectAreaError] = useState(false);
    const [cityError, setCityError] = useState(false);

    const submitFormHandler = (e) => {
        e.preventDefault();

        const selectedArea = selectedAreaRef.current.value;
        const validSelectedArea = !!selectedArea;
        setSelectAreaError(!validSelectedArea);

        const city = cityInputRef.current.value;
        const validCity = notEmptyString(city);
        setCityError(!validCity);

        if(validSelectedArea && validCity) {
            props.onSelectAreaAndCity(selectedArea, city);
        }
    }

    return (
        <form name="select-area-city-form" className={classes['select-area-city-form']} onSubmit={submitFormHandler}>
            <h2>Оберіть галузь знань та місто</h2>
            <label>Оберіть галузь:</label>
            <select ref={selectedAreaRef}>
                {areas.map(area => <option key={area.cipher} value={area.cipher}>{area.cipher + ', ' + area.subjectAreaName}</option>)}
            </select>
            {selectAreaError && <p className={classes.error}>Галузь має бути обрана</p>}

            <input className={classes.input} type="text" placeholder="Місто" required ref={cityInputRef}/>
            {cityError && <p className={classes.error}>Місто не може бути порожнім</p>}

            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Показати статистику" />
        </form>
    );
}

export default SelectAreaAndCityForm;