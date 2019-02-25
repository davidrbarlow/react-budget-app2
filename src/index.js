import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line
import AppRouter, { history } from './routers/AppRouter'
//import './index.css';
//import App from './App';
// eslint-disable-next-line
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { startSetTransactions } from './actions/transactions';

import './styles/styles.scss';



const store = configureStore();

// store.dispatch(addTransaction({
//   _id: '5c6f10d9348d094ad2899e67',    
//   amount : -1096.34,
//   postedAt : 1549267200000,
//   balance : 3000.0,
//   description : "USBANK LOAN      PAYMENT                    PPD ID:  580580574",
// }));

// store.dispatch(addTransaction({   
//   _id: '5c6f10d9348d094ad2899e68', 
//   amount : -150,
//   postedAt : 1549268000000,
//   balance : 2850.0,
//   description : "PHONE PAYMENT 2939484",
// }));
store.dispatch(startSetTransactions());


const jsx =(
  <Provider store = {store}>
     <AppRouter />
  </Provider>
 );



ReactDOM.render(jsx, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


