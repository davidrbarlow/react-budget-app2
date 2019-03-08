import React from 'react';
import {connect} from 'react-redux';
//import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import TransactionItemForm from './TransactionItemForm';
import {editTransactionId} from '../actions/pageEdits';
import {removeSelectedTransactionId, setSelectedTransactionId} from '../actions/selectedRows';
import {startEditTransaction, startRemoveTransaction} from '../actions/transactions';

 //
class TransactionListItem extends React.Component {
    constructor(props) {
      super(props);

    this.state = {
        cycle: props ? props.cycle : ' ',
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
        this.setState(()=>({cycle}));
        this.props.startEditTransaction(this.props._id, {cycle});
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
    console.log('ID of selected', this.props._id, selected);
    selected ? this.props.setSelectedTransactionId(this.props._id) :this.props.removeSelectedTrasactionId(this.props._id);
    //toggle trash can view - might need to search state container and look to see if any are selected
    //update state - true false

    //when trash button clicked
    //update transaciton reducer to add filter for deletes
    //read from state container and create array of all checked user IDs
    //create delete multiple API - Site.deleteMany({ userUID: uid, id: { $in: [10, 2, 3, 5]}}, function(err) {})
    //action for startMultiDelete witch will call API then call reducer
  }

  render(){
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
        <div className="description-mobile show-for-mobile description" >{this.props.description}</div>
        <div className="description show-for-desktop" >{this.props.description}</div>
        <div className="amount"> 
            {numeral(this.props.amount/100).format('$0,0.00')} 
        </div>
    
        
      {/*console.log('Translist render props',this.props, this.state)*/}
      
        <select className="select-transaction" value={this.state.cycle} onChange={this.onCycleChange}>
          <option value="NA"></option>
          <option value="Monthly">Monthly</option>
          <option value="Bi-weekly">Bi-weekly</option>  
        </select>
        
        <div className="icons show-for-desktop">
          <input type="image" id={'editButton'} src={'/images/edit.svg'} 
          onClick={()=>this.handleEditRow(this.props._id)}
          alt={'Edit'} width={'20'} height={'20'}/>
          <input type="image" id={'deleteButton'} src={'/images/delete.svg'} 
          onClick={()=>this.handleRemoveRow(this.props._id)}
          alt={'Delete'} width={'20'} height={'20'}/>
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
       cycle2: state.cycle
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
