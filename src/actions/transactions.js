import axios from 'axios';

export const addTransaction = (transaction) => ({
  type: 'ADD_TRANSACTION',
  transaction
});

export const startAddTransaction = (transactionData = {}) => {

  return (dispatch, getState) => {
   // const uid = getState().auth.uid;
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
      transaction
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
   // const uid = getState().auth.uid;
  return  axios.patch(`${process.env.REACT_APP_API_URL}/transaction/edit/${id}`,updates)
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
    //const uid = getState().auth.uid;
    return  axios.delete(`${process.env.REACT_APP_API_URL}/transaction/remove/${id}`)
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
  
  const idJSON = JSON.stringify({ids});
  console.log('ID', idJSON);
  return (dispatch,getState) => {
    //const uid = getState().auth.uid;
    return  axios.patch(`${process.env.REACT_APP_API_URL}/transaction/removeSelected`,idJSON)
    .then(()=>{   
      dispatch(removeTransactions(ids));
      });
   };
}



export const setTransactions = (transactions) => ({
  type:'SET_TRANSACTIONS',
  transactions
});

export const startSetTransactions = () => {
  return (dispatch)=>{
    return axios.get(`${process.env.REACT_APP_API_URL}/transaction`).then((res)=>{
    dispatch(setTransactions(res.data.transactions));
  })
  }

};




export const csvUpload = (file) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/transaction/upload`,
      file,
      { headers: {
        'Content-Type': 'multipart/form-data'
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

