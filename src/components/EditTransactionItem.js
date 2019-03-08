import React from 'react';
import {connect} from 'react-redux';
import TransactionItemForm from './TransactionItemForm';

const EditTransactionItem = (props) => {

  return (
    <div>
      <TransactionItemForms
        transaction = {props.transaction}
        onSubmit={(transaction)=>{
        props.dispatch(startEditTransaction(props.transaction.id, transaction));
        console.log(props.match.params.id);
      }}
      />


    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
      expense: state.transctions.find((transaction)=>transaction.id === props.match.params.id)
  };
};
export default connect(mapStateToProps)(EditExpensePage);