import React from 'react';
import {connect} from 'react-redux';
//import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import TransactionItemForm from './TransactionItemForm';
import { editTransactionId } from '../actions/pageEdits';
import { removeSelectedTransactionId, setSelectedTransactionId } from '../actions/selectedRows';
import { startEditTransaction, startRemoveTransaction } from '../actions/transactions';
//import { stat } from 'fs';

 //
class TransactionListItem extends React.Component {
    constructor(props) {
      super(props);

    this.state = {
      //cycle : props.balance ? 'Balance' : props.cycle,
      cycle: props.cycle ? props.cycle : '',
      selected : false
    };

  this.handleEditRow = this.handleEditRow.bind(this);  
  this.handleRemoveRow = this.handleRemoveRow.bind(this);  
  this.onSubmit = this.onSubmit.bind(this);     
  };

  handleRemoveRow = async (id) => {
  
    await this.props.startRemoveTransaction(id);
    this.props.handleState();
  }

  handleEditRow = (id) => {
    this.props.updateEditTransactionId(id);
  }

  onCycleChange = (e) => {
    const cycle = e.target.value;
    this.setState(()=>({ cycle }));
    this.props.startEditTransaction(this.props._id, { cycle });
  }

  onSubmit = async (transaction) => {
    const {cycle} = transaction;
    await this.props.startEditTransaction(this.props._id, transaction);
    this.setState(()=>({cycle}));
    // window.location.reload();
    await this.props.updateEditTransactionId(' ');
    // this.props.toggleAddTransaction();
      this.props.handleState();
  };

  onSelectedChange = (e) => {
    const selected = this.state.selected === true ? false : true;
    this.setState(()=>({selected}));
    selected ? this.props.setSelectedTransactionId(this.props._id) :this.props.removeSelectedTrasactionId(this.props._id);
  };

  render(){

    let rsumClassName;

    if ((this.props.accountType === 'Projected' || this.props.accountType === 'Projection') && this.props.rsum>0) {
      rsumClassName = 'amount amount__rsum-green';
    } 
    else if ((this.props.accountType === 'Projected' || this.props.accountType === 'Projection') && this.props.rsum<0) {
      rsumClassName = 'amount amount__rsum-red';
    } else {
      rsumClassName = 'amount';
    }
    
    return(
      
   <div>
    
    <div className="data-grid"
      style = {{display: (this.props.pageEdits.editTransactionId !== this.props._id) ? "" : "none"}}
  
          >
        <input type="checkbox" display="none" name="selectedTransaction" 
          className="show-for-desktop checkbox" 
          value={this.state.selected} onChange={this.onSelectedChange}
          disabled={this.props.pageEdits.addTransaction}
          >
        </input>
        <div className="date" >{moment(this.props.postedAt).format('MMMM Do, YYYY')}</div>

        <span className="description-mobile show-for-mobile description"
          onClick={()=>this.handleEditRow(this.props._id)}>
            {this.props.description}
        </span>
        
        <div className="description show-for-desktop">{this.props.description}</div>

        <div className = "amount">
          {numeral(this.props.amount/100).format('$0,0.00')}
        </div>
        
        {this.props.rsum && <div className={rsumClassName}> 
        {numeral(this.props.rsum/100).format('$0,0.00')}
        </div>}
        
    
        {this.props.pageEdits.activePage !== 'projection' 
        && <select className="select select__transaction" value={this.state.cycle} onChange={this.onCycleChange}>
          <option value="NA"></option>
          <option value="Balance">Balance</option>
          <option value="Bi-weekly">Bi-weekly</option>
          <option value="Monthly">Monthly</option>
        </select>}

        {console.log('pageEdits ',this.props.pageEdits)}
        {console.log('accountType ',this.props.rsum)}
        <div className="icons show-for-desktop">
        {(this.props.pageEdits.activePage !== 'projection') && <input type="image" id={'editButton'} src={'/images/edit.svg'} 
          onClick={()=>this.handleEditRow(this.props._id)}
          alt={'Edit'} width={'20'} height={'20'}/>}
    
          {(this.props.pageEdits.activePage !== 'projection') && <input type="image" id={'deleteButton'} src={'/images/delete.svg'} 
          onClick={()=>this.handleRemoveRow(this.props._id)}
          alt={'Delete'} width={'20'} height={'20'}/>}
        </div>
    </div>
    <div>
      {this.props.pageEdits.editTransactionId === this.props._id &&
        <TransactionItemForm  
        transaction={this.props}
        onSubmit={this.onSubmit}
        />}
    </div>
  </div>
          
  )};
 };
 
const mapStateToProps = (state) => {
     return {
       pageEdits: state.pageEdits,
       cycle2: state.cycle,
     //  amount: state.transactions.amount
     };
 }

 const mapDispatchToProps = (dispatch) => ({
  startEditTransaction : (id,transaction) => dispatch(startEditTransaction(id,transaction)),
  startRemoveTransaction : (id) => dispatch(startRemoveTransaction(id)),
  updateEditTransactionId : (id) => dispatch(editTransactionId(id)),
  setSelectedTransactionId : (id) => dispatch(setSelectedTransactionId(id)),
  removeSelectedTrasactionId : (id) => dispatch(removeSelectedTransactionId(id))
  })

  
 export default connect(mapStateToProps,mapDispatchToProps)(TransactionListItem);
