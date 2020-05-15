/* global window */

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import App from './app/App';
import rootReducer from './reducers';

const rootElement = document.getElementById('app-root');

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-enable */

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement,
);
