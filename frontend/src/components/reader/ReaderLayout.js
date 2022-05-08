import HeaderLayout from "../layout/HeaderLayout";

const readerMenus = [
    {
        title: 'Книги',
        link: '/reader/books'
    },
    {
        title: 'Історія видач',
        link: '/reader/checkouts'
    }
];

function ReaderLayout(props) {
    return (
        <HeaderLayout menus={readerMenus}>
            {props.children}
        </HeaderLayout>
    );
}

export default ReaderLayout;