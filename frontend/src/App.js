import './App.css';

import { Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Login from './pages/Login';
import ReaderRegistration from './pages/ReaderRegistration';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<Navigate redirect to='/login' />}></Route>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/registerReader' exact element={<ReaderRegistration />}></Route>
      </Routes>
    </div>
  );
}

export default App;
