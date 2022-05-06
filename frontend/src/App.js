import './App.css';

import { Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Login from './pages/Login';
import ReaderRegistration from './pages/ReaderRegistration';
import RequireAuth from './components/security/RequireAuth';
import ReaderBooks from './pages/ReaderBooks';
import LibrarianBooks from './pages/LibrarianBooks';
import AdministratorBooks from './pages/AdministratorBooks';
import { useSelector } from 'react-redux';

function App() {

  const roles = useSelector(state => state.auth.roles);

  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Navigate redirect to={roles ? '/readerBooks' : '/login'} />}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/registerReader' exact element={<ReaderRegistration />}></Route>

        <Route element={<RequireAuth allowedRoles={['READER']}></RequireAuth>}>
          <Route path='/readerBooks' element={<ReaderBooks />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['LIBRARIAN']}></RequireAuth>}>
          <Route path='/librarianBooks' element={<LibrarianBooks />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['ADMINISTRATOR']}></RequireAuth>}>
          <Route path='/administratorBooks' element={<AdministratorBooks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
