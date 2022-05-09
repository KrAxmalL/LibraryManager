import { useEffect, useMemo, useRef, useState } from 'react';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import classes from './EditAreasForm.module.css';

function EditAreasForm(props) {
    const areas = props.areas;
    const bookAreas = props.bookAreas;
    const [selectedAreas, setSelectedAreas] = useState([]);

    const areasForCheckbox = useMemo(() => {
        return areas.map(area => {
                return {
                    id: area.cipher,
                    displayValue: area.subjectAreaName,
                    isChecked: bookAreas.includes(area.subjectAreaName)
                }
            }
        )
    }, [areas, bookAreas]);

    useEffect(() => {
        setSelectedAreas(areas.filter((area, index) => areasForCheckbox[index].isChecked));
    }, [areas, areasForCheckbox]);

    const areasSelectionChangeHandler = (newSelectedAreas) => {
        setSelectedAreas(areas.filter((area, index) => newSelectedAreas[index]))
    }

    const submitFormHandler = (e) => {
        e.preventDefault();
        props.onEditAreas(selectedAreas);
    }

    return (
        <form name="edit-areas-form" className={classes['edit-areas-form']} onSubmit={submitFormHandler}>
            <h2>Редагувати жанри</h2>
            <label>Оберіть жанри:</label>
                    <CheckboxGroup className={classes['checkbox-list']} items={areasForCheckbox}
                                   onSelectionChange={areasSelectionChangeHandler} />
            {selectedAreas.length === 0 &&
                <p className={classes.error}>Хоча б один жанр має бути обраний</p>
            }
            <input className={`${classes.input} ${classes.submit}`} type="submit" value="Зберегти зміни"
                   disabled={selectedAreas.length === 0} />
        </form>
    );
}

export default EditAreasForm;