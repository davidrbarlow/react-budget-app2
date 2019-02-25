import axios from 'axios';

export const addTransaction = (transaction) => ({
  type: 'ADD_TRANSACTION',
  transaction
});

export const removeTransaction = ({id} = {}) => ({
  type: 'REMOVE_TRANSACTION',
  id
});


export const editExpense = (id, updates) =>({
  type: 'EDIT_TRANSACTION',
  id,
  updates
});

export const setTransactions = (transactions) => ({
  type:'SET_TRANSACTIONS',
  transactions
});

export const startSetTransactions = () => {
  return (dispatch)=>{
    console.log('in dispatch');
    axios.get('http://localhost:3000/transaction').then((res)=>{
    dispatch(setTransactions(res.data.transactions));
    console.log('res.data.trans ',res.data.transactions);
  })
  }

};




export const csvUpload = (file) => {
    return axios.post('http://localhost:3000/transaction/upload',
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
        console.log('axios res', res);
        if(res.data.status === 400){
          console.log('throw');
          throw(res);
          //console.log('JSON.stringify(res) ', JSON.stringify(res));
        }else{
          console.log('else JSON.stringify(res) ', JSON.stringify(res));
          return(res);
        }  
      })
      // .catch((e)=>{
      //   console.log('axios e', e);
      //   return Promise.reject(e);
      // })
};

