import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/index'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import jwtDecode from 'jwt-decode';
import { authActions } from './store/auth-slice';

import 'bootstrap/dist/css/bootstrap.min.css';

const accessToken = localStorage.getItem('accessToken');
if(accessToken) {
  const roles = jwtDecode(accessToken).roles;

  store.dispatch(authActions.setAccessToken({ accessToken }));
  store.dispatch(authActions.setRoles({ roles }));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
