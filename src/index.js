import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from "react-cookie"
import { Provider } from 'react-redux'
import STORE from "./redux/store"


ReactDOM.render(
    <CookiesProvider>
        <Provider store={STORE}>
            <App />
        </Provider>
    </CookiesProvider>
    , document.getElementById('root'));

serviceWorker.unregister();
