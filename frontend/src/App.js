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

function App() {

  const roles = useSelector(state => state.auth.roles);

  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Navigate redirect to={roles ? '/reader/books' : '/login'} />}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/registerReader' exact element={<ReaderRegistration />}></Route>

        <Route element={<RequireAuth allowedRoles={['READER']}></RequireAuth>}>
          <Route path='/reader/books' element={<ReaderBooks />} />
          <Route path='/reader/books/:bookIsbn' element={<ReaderBookDetails />} />
          <Route path='/reader/checkouts' element={<ReaderCheckouts />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['LIBRARIAN']}></RequireAuth>}>
          <Route path='/librarian/books' element={<LibrarianBooks />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['ADMINISTRATOR']}></RequireAuth>}>
          <Route path='/administratorBooks' element={<AdministratorBooks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
