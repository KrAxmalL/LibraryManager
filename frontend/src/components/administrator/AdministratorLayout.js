import HeaderLayout from "../layout/HeaderLayout";

const administratorMenus = [
    {
        title: 'Читачі',
        link: '/administrator/readers'
    },
    {
        title: 'Книги',
        link: '/administrator/books'
    },
    {
        title: 'Галузі знань',
        link: '/administrator/areas'
    },
    {
        title: 'Заміни книг',
        link: '/administrator/replacements'
    }
];

function AdministratorLayout(props) {
    return (
        <HeaderLayout menus={administratorMenus}>
            {props.children}
        </HeaderLayout>
    );
}

export default AdministratorLayout;