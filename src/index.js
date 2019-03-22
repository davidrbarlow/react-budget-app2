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
import LoadingPage from './components/LoadingPage';
//import auth from './reducers/auth';

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
const select = (state) => {
   return state.auth.authToken;
};

let currentToken;
const handleChange = () => {
   let previousToken = currentToken;

   currentToken = select(store.getState());
   console.log('index handle change called, current token is ', currentToken);
   console.log('history location pathname', history.location.pathname );
//   const token = 'test';
   if (previousToken !== currentToken && currentToken){
      store.dispatch(startSetTransactions(currentToken)).then(()=>{
         renderApp();
         if(history.location.pathname === '/'){
            history.push('/dashboard'); 
         }
      });
   } else if (!currentToken && (history.location.pathname !== '/signup' && history.location.pathname !== '/')){
      renderApp();
      console.log('push to home');
      history.push('/');
   }
};

store.subscribe(()=>{
   //posibly remove
   localStorage.setItem('TOKEN', store.getState().auth.authToken);
   console.log(handleChange());
});

// possibly remove
store.dispatch(startSetTransactions(store.getState().auth.authToken));



const jsx =(
  <Provider store = {store}>
     <AppRouter />
  </Provider>
 );

 let hasRendered = false;

 const renderApp = () => {
    if (!hasRendered) {
      ReactDOM.render(jsx, document.getElementById('root'));
      hasRendered= true;
    }
 };


ReactDOM.render(<LoadingPage />, document.getElementById('root'));
renderApp();








// store.subscribe(()=>{
//    localStorage.setItem('TOKEN', store.getState().auth.authToken);
//    console.log('handleChange called');
//    console.log(handleChange());
// });







// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


