import React from 'react';
import {connect} from 'react-redux';
//import { withRouter} from 'react-router-dom';
import TransactionItemForm from './TransactionItemForm';
import {startAddTransaction}  from '../actions/transactions';
import {toggleAddTransaction}  from '../actions/pageEdits';

export class AddTransactionItem extends React.Component {
 
  // constructor(props) {
  //   super(props);
  
  // }

    onSubmit = async (transaction) => {
      await this.props.startAddTransaction(transaction);
      // window.location.reload();
      await this.props.handleState();
      this.props.toggleAddTransaction();
    };

    render() {
      return(
      <div>
        <TransactionItemForm 
        onSubmit={this.onSubmit}
        />
      </div>
    );
    }

}


const mapDispatchToProps = (dispatch) => ({
  startAddTransaction: (transaction) => dispatch(startAddTransaction(transaction)),
  toggleAddTransaction: () => dispatch(toggleAddTransaction())
})

//export default connect(undefined, mapDispatchToProps)(withRouter(AddTransactionItem));
export default connect(undefined, mapDispatchToProps)(AddTransactionItem);