import React from 'react';
import {connect} from 'react-redux';
import TransactionListItem from './TransactionListItem';
import selectTransactions from '../selectors/transactions';
 
export const TransactionList = (props) => (
    <div>
    <div>
      <div className="show-for-desktop">Date</div>
      <div className="show-for-desktop">Description</div>
      <p></p>
     
    </div>
    <div className="list-body">
    {console.log('props',props)}
        { 
            props.transactions.length === 0 ? (
                <div>
                <span>No Transactions</span>
                </div>
            ):(
            props.transactions.map((transaction) => {
            return <TransactionListItem key={transaction._id} {...transaction} />
        
        })
        )
            
    }
    </div>
    </div>
)
 
 
const mapStateToProps = (state) => {
  console.log('mapStateToProps state ', state);
  console.log('mapStateToProps state');
    return {
      transactions: selectTransactions(state.transactions, state.filters)
     //transactions: state.transactions
    };
}
 
 
export default connect(mapStateToProps)(TransactionList);