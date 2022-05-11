import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTakenBooksForAreasForPeriod } from "../../api/areas";
import AdministratorLayout from "../../components/administrator/AdministratorLayout";
import SelectPeriodForm from "../../components/administrator/SelectPeriodForm";
import ContentTable from "../../components/layout/ContentTable";
import Modal from "../../components/layout/Modal";

import classes from './AdministratorAreas.module.css';

const areaFields = ['Шифр галузі', 'Назва галузі'];
const areaBooksStatisticsFields = ['Шифр галузі', 'Назва галузі', 'Кількість взятих книг'];

function AdministratorAreas() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [tableContent, setTableContent] = useState({fields: [], content: []});

    const [modalVisible, setModalVisible] = useState(false);
    const [selectPeriodFormVisible, setSelectPeriodFormVisible] = useState(false);

    const showAreasStatisticsHandler = async (startDate, endDate) => {
        setIsLoading(true);
        try {
            const areas = await getTakenBooksForAreasForPeriod(accessToken, startDate, endDate);
            setTableContent({fields: areaBooksStatisticsFields, content: areas});
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const showSelectPeriodFormHandler = (e) => {
        setModalVisible(true);
        setSelectPeriodFormVisible(true);
    }

    const hideModalClickHandler = (e) => {
        setModalVisible(false);
        setSelectPeriodFormVisible(false);
    }

    return (
        <AdministratorLayout>
            <h1 className={classes['page-title']}>Статистика по галузям знань</h1>
            <div className="container">
                <button className={classes.btn} onClick={showSelectPeriodFormHandler}>Показати кількість книг, які брали з кожної галузі знань за певний період</button>
            {!isLoading &&
                <ContentTable columns={tableContent.fields} data={tableContent.content} />
            }
            {modalVisible &&
                <Modal onClose={hideModalClickHandler}>
                    {selectPeriodFormVisible && <SelectPeriodForm onSelectPeriod={showAreasStatisticsHandler}/>}
                </Modal>
            }
            </div>
        </AdministratorLayout>
    );
}

export default AdministratorAreas;