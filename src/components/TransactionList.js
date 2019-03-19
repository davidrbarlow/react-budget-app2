import React from 'react';
import {connect} from 'react-redux';
import TransactionListItem from './TransactionListItem';
import selectTransactions from '../selectors/transactions';
import AddTransactionItem  from './AddTransactionItem';
import { startSetTransactions } from '../actions/transactions';




export class TransactionList extends React.Component {
//export const TransactionList = (props) => (
    constructor(props) {
        super(props);

        this.handleState = this.handleState.bind(this);
      
      }

 handleState = async () => {
     await this.props.startSetTransactions();
     await this.setState(this.state);
    };
    
render(){
    return (
    <div>
    <div className="grid-container" >
        
        <span>
            <div className="transaction-header">Transactions</div>
        </span>
        <div>
             {this.props.pageEdits.addTransaction && <AddTransactionItem handleState={this.handleState}/>}    
        </div>
     
             {console.log('props of Transaction List',this.props)}
        {
            this.props.transactions.length === 0 ? (
                <div>
                    <span>No Transactions</span>
                </div>
            ):(
                
            this.props.transactions.map((transaction) =>  
            
            <TransactionListItem key={transaction._id} {...transaction} handleState={this.handleState}/>
            )
        )
            
    }
    </div>
    </div>
);
//handleState={ this.handleState }
}
 }


 const mapDispatchToProps = (dispatch) => ({
    startSetTransactions : (token) => dispatch(startSetTransactions(token)),
  //  toggleAddTransaction : () => dispatch(toggleAddTransaction())
    })
 
const mapStateToProps = (state) => {
  console.log('mapStateToProps state ', state);
    return {
      transactions: selectTransactions(state.transactions, state.filters),
      pageEdits: state.pageEdits,
    };
}
 
 
export default connect(mapStateToProps,mapDispatchToProps)(TransactionList);