import axios from 'axios';
import { removeSelectedTransactionIds } from './selectedRows';


export const addTransaction = (transaction) => ({
  type: 'ADD_TRANSACTION',
  transaction
});

export const startAddTransaction = (transactionData = {}) => {

  return (dispatch, getState) => {
    const token = getState().auth.authToken;
    const {
        description = '', 
        amount = 0, 
        postedAt = 0 ,
        cycle = ''
    } = transactionData;
  
    const transaction = {description, amount, postedAt, cycle};

    //add transaction api
    console.log('start add trans ', `${process.env.REACT_APP_API_URL}/transaction/transaction`);
    return axios.post(`${process.env.REACT_APP_API_URL}/transaction/transaction`,
      transaction,
      {
        headers : { 'x-auth':token}
      }
    ).then((res)=>{
    }).catch((e)=>{
      console.log(e);
    });
  };
};

export const editTransaction = (id, updates) =>({
  type: 'EDIT_TRANSACTION',
  id,
  updates
});

//startEditTransaction

export const startEditTransaction = (id, updates) => {
  return (dispatch,getState) => {
   const token = getState().auth.authToken;
   console.log(token);
  return  axios.patch(`${process.env.REACT_APP_API_URL}/transaction/edit/${id}`, 
  updates,
  {
    headers: {
      'x-auth': token
    }
  })
  .then(()=>{   
    dispatch(editTransaction(id, updates));
    });
  };
}

export const removeTransaction = (id) => ({
  type: 'REMOVE_TRANSACTION',
  id
});

export const startRemoveTransaction = (id) => {
  console.log('ID', id);
  return (dispatch,getState) => {
    const token = getState().auth.authToken;
    return  axios.delete(`${process.env.REACT_APP_API_URL}/transaction/remove/${id}`,
    {
      headers: {
        'x-auth': token
      }
    })
    .then(()=>{   
      dispatch(removeTransaction(id));
      });
   };
}

export const removeTransactions = (ids) => ({
  type: 'REMOVE_TRANSACTIONS',
  ids
});

export const startRemoveTransactions = (ids) => {
 // const idJSON = JSON.stringify({ids});
  return (dispatch,getState) => {
    const token = getState().auth.authToken;
    return  axios.patch(`${process.env.REACT_APP_API_URL}/transaction/removeSelected`,
    {
      ids
    },
    {
      headers: {'x-auth': token}
    })
    .then(()=>{   
      dispatch(removeTransactions(ids));
      dispatch(removeSelectedTransactionIds(ids));
    });
   };
}



export const setTransactions = (transactions) => ({
  type:'SET_TRANSACTIONS',
  transactions
});

export const startSetTransactions = () => {
  
  return (dispatch, getState)=>{
    const token = getState().auth.authToken;
    return axios.get(`${process.env.REACT_APP_API_URL}/transaction`,
    {
      headers:{
        'x-auth':token
      }
    }
    ).then((res)=>{
    dispatch(setTransactions(res.data.transactions));
  })
  }

};




export const csvUpload = (file, token) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/transaction/upload`,
      file,
      { headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth': token
        }
      },
      {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then((res)=>{
        if(res.data.status === 400){
          throw(res);
        }else{
          return(res);
        }  
      })
      // .catch((e)=>{
      //   console.log('axios e', e);
      //   return Promise.reject(e);
      // })
};

