import HeaderLayout from "../layout/HeaderLayout";

const librarianMenus = [
    {
        title: 'Книги',
        link: '/librarian/books'
    },
    {
        title: 'Додати книгу',
        link: '/librarian/books/add'
    },
    {
        title: 'Історія видач',
        link: '/librarian/checkouts'
    },
    {
        title: 'Читачі',
        link: '/librarian/readers'
    }
];

function LibrarianLayout(props) {
    return (
        <HeaderLayout menus={librarianMenus}>
            {props.children}
        </HeaderLayout>
    );
}

export default LibrarianLayout;