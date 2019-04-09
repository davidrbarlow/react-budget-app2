import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
//import {editTransaction} from '../actions/transactions';

export class TransactionItemForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postedAt: props.transaction ? moment(props.transaction.postedAt) : moment(),
      description: props.transaction ? props.transaction.description : '',
      amount: props.transaction ? (props.transaction.amount/100).toString() : '',
      cycle: props.transaction ? props.transaction.cycle : 'Type',
      calaendarFocustd: false,
      error: '',
     // _id: props._id ? props._id : ' ',
    };

  
  }

  onSubmit = (e) => {
    let cycle = this.state.cycle;
    
    e.preventDefault();
    if (!this.state.description || !this.state.amount){     
      this.setState(()=>({error: 'Please provide description and amount'}))
    } else {
      this.setState(()=>({error: ''}))
      this.props.onSubmit({
        description: this.state.description,
        amount : parseFloat(this.state.amount, 10) * 100,
        postedAt: this.state.postedAt.valueOf(),
        accountType: (this.props.activePage==='projection')? 'Projection' : 'Manual',
        cycle,
        });
      //this.props.editTransaction()
      }

  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(()=>({description}));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState(()=>({amount}))
    }
  }

  onCycleChange = (e) => {
    const cycle = e.target.value;
    this.setState(()=>({cycle}));
  }

  onDateChange= (postedAt) => {
    if (postedAt) {
        this.setState(()=>({postedAt}));
    }
  };

  onFocusChange= ({focused}) => {
    this.setState(()=>({calendarFocused: focused}))
  };

  render() {
    return(
      <div>
        <div className="error-message">
          {this.state.error && <p>{this.state.error}</p>}
        </div>
        <form onSubmit={this.onSubmit} className="data-grid">
        <div className="date-input">
          <SingleDatePicker
            date={this.state.postedAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange = {this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={()=> false}
            small={true}
            
          />
        </div>
        <div className="description-mobile show-for-mobile description">
          <input
            type="text"
            placeholder="Description"
            autoFocus
            className="input-text"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
        </div>
        <div className="description show-for-desktop">
          <input
            type="text"
            placeholder="Description"
            autoFocus
            className="input-text"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
        </div>
          <div className="amount">
            <input
            type="text"
            placeholder="Amount"
            className="amount-input"
            value={this.state.amount}
            onChange={this.onAmountChange}
            />  
          </div>
        <div>
          <select
            className="select select__transaction"
            value={this.state.cycle}
            onChange={this.onCycleChange}
          >
            <option value="NA" disabled>Type</option>
            <option value="NA"></option>
            <option value="Balance">Balance</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        
        </div>
        
        <input className="check-input" type="image" alt={'OK'} src={'/images/checked.svg'}></input>
        
        
        </form>
      
      
      
      </div>
      
      
    )
  };

};

const mapStateToProps = (state) =>({
  activePage : state.pageEdits.activePage
});

export default connect(mapStateToProps)(TransactionItemForm);

