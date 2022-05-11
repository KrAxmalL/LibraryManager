import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllReplacementActs } from "../../api/replacementActs";
import AdministratorLayout from "../../components/administrator/AdministratorLayout";
import ContentTable from "../../components/layout/ContentTable";
import classes from './AdministratorReplacementActs.module.css'; 

const actFields = ['ISBN', 'Назва книги', 'Номер акту заміни', 'Номер заміненого екземпляра',
                   'Номер екземпляра-заміни', 'Дата заміни', 'Ціна заміни'];

function AdministratorReplacementActs() {

    const accessToken = useSelector(state => state.auth.accessToken);
    const [isLoading, setIsLoading] = useState(false);
    const [replacementActs, setReplacementActs] = useState([]);

    useEffect(() => {
        const fetchReplacementActs = async() => {
            try {
                const replacementActs = await getAllReplacementActs(accessToken);
                setReplacementActs(replacementActs);
            } catch (e) {
                console.log(e);
            }
        }
        setIsLoading(true);
        fetchReplacementActs();
        setIsLoading(false);
    }, [accessToken, setReplacementActs]);

    return (
        <AdministratorLayout>
            <h1 className={classes['page-title']}>Акти заміни примірників</h1>
            <div className="container">
            {!isLoading &&
                <ContentTable columns={actFields} data={replacementActs} />
            }
            </div>
        </AdministratorLayout>
    );
}

export default AdministratorReplacementActs;