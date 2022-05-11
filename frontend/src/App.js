import './App.css';

import { Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Login from './pages/public/Login';
import ReaderRegistration from './pages/public/ReaderRegistration';
import RequireAuth from './components/security/RequireAuth';
import ReaderBooks from './pages/reader/ReaderBooks';
import LibrarianBooks from './pages/librarian/LibrarianBooks';
import AdministratorBooks from './pages/administrator/AdministratorBooks';
import { useSelector } from 'react-redux';
import ReaderCheckouts from './pages/reader/ReaderCheckouts';
import ReaderBookDetails from './pages/reader/ReaderBookDetails';
import LibrarianAddBook from './pages/librarian/LibrarianAddBook';
import LibrarianCheckouts from './pages/librarian/LibrarianCheckouts';
import LibrarianReaders from './pages/librarian/LibrarianReaders';
import Unauthorized from './pages/public/Unauthorized';
import LibrarianBookDetails from './pages/librarian/LibrarianBookDetails';
import AdministratorReaders from './pages/administrator/AdministratorReaders';
import AdministratorAreas from './pages/administrator/AdministratorAreas';
import AdministratorReplacementActs from './pages/administrator/AdministratorReplacementActs';

function App() {

  const roles = useSelector(state => state.auth.roles);

  const navigateAfterLogin = (roles) => {
    if(!roles) {
      return '/login';
    }
    else if(roles.includes('READER')) {
      return '/reader/books';
    }
    else if(roles.includes('LIBRARIAN')) {
      return '/librarian/books';
    }
    else if(roles.includes('ADMINISTRATOR')) {
      return '/administrator/readers';
    }
    else {
      return '/unauthorized';
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Navigate redirect to={navigateAfterLogin(roles)} />}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/register' exact element={<ReaderRegistration />}></Route>
        <Route path='/unauthorized' exact element={<Unauthorized />}></Route>

        <Route element={<RequireAuth allowedRoles={['READER']}></RequireAuth>}>
          <Route path='/reader/books' element={<ReaderBooks />} />
          <Route path='/reader/books/:bookIsbn' element={<ReaderBookDetails />} />
          <Route path='/reader/checkouts' element={<ReaderCheckouts />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['LIBRARIAN']}></RequireAuth>}>
          <Route path='/librarian/books' element={<LibrarianBooks />} />
          <Route path='/librarian/books/:bookIsbn' element={<LibrarianBookDetails />} />
          <Route path='/librarian/books/add' element={<LibrarianAddBook />} />
          <Route path='/librarian/checkouts' element={<LibrarianCheckouts />} />
          <Route path='/librarian/readers' element={<LibrarianReaders />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMINISTRATOR']}></RequireAuth>}>
          <Route path='/administrator/readers' element={<AdministratorReaders />} />
          <Route path='/administrator/books' element={<AdministratorBooks />} />
          <Route path='/administrator/areas' element={<AdministratorAreas />} />
          <Route path='/administrator/replacements' element={<AdministratorReplacementActs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
