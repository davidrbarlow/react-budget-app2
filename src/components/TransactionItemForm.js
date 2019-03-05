import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

export default class TransactionItemForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      postedAt: props.transaction ? moment(props.transaction.postedAt) : moment(),
      description: props.transaction ? props.transaction.description : '',
      amount: props.transaction ? (props.transaction.amount/100).toString() : '',
      cycle: props.transaction ? props.transaction : ' ',
      calaendarFocustd: false,
      error: ''
    };

  
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('on submit');

    if (!this.state.description || !this.state.amount){     
      this.setState(()=>({error: 'Please provide description and amount'}))
    } else {
      this.setState(()=>({error: ''}))
      this.props.onSubmit({
        description: this.state.description,
        amount : parseFloat(this.state.amount, 10) * 100,
        postedAt: this.state.postedAt.valueOf(),
        cycle: this.state.cycle
        })
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
   // console.log('this.state.cycle ', this.state.cycle, e.target, e.target.value);
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
      <form onSubmit={this.onSubmit}>
      {this.state.error && <p>{this.state.error}</p>}
      <SingleDatePicker
        date={this.state.postedAt}
        onDateChange={this.onDateChange}
        focused={this.state.calendarFocused}
        onFocusChange = {this.onFocusChange}
        numberOfMonths={1}
        isOutsideRange={()=> false}
      />
      <input
        type="text"
        placeholder="Description"
        autoFocus
        className="text-input"
        value={this.state.description}
        onChange={this.onDescriptionChange}
       
      />
      <input
        type="text"
        placeholder="Amount"
        className="text-input"
        value={this.state.amount}
        onChange={this.onAmountChange}
      />
      <select
        value={this.state.cycle}
        onChange={this.onCycleChange}
      
      >
        <option value="NA"></option>
        <option value="Monthly">Monthly</option>
        <option value="Bi-weekly">Bi-weekly</option>
      </select>
      <button>Add</button>
      </form>



    )
  }

}