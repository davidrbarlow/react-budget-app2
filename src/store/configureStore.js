import {createStore,  combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import transactionsReducer from '../reducers/transactions';
import filtersReducer from '../reducers/filters';
import pageEditsReducer from '../reducers/pageEdits';
import selectedRowsReducer from '../reducers/selectedRows';

//remove
import { setAuthToken } from '../actions/auth';

export default () => {

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
    auth : authReducer,
    transactions: transactionsReducer,
    filters: filtersReducer,
    pageEdits: pageEditsReducer,
    selectedRows:  selectedRowsReducer
}),
    composeEnhancers(applyMiddleware(thunk))
    );

    // posibly remove
    store.dispatch(setAuthToken(localStorage.getItem('TOKEN')));

return store;
};