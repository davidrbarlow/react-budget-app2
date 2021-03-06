import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';


export class TransactionListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };
  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) =>{
    this.setState(()=>({calendarFocused}))
  };

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e) => {
    if (e.target.value === 'date') 
      {
        this.props.sortByDate()
      } else if (e.target.value === 'amount'){
        this.props.sortByAmount();
      } 
  };

  render(){
      return (
        <div className="filters">
          <input 
            type="text" 
            className="input-text input-text__filter filters__text-input "
            placeholder = "Search Expenses"
            value={this.props.filters.text} 
            onChange={this.onTextChange}/>
          <select className="select select__filter filters__select"
            value={this.props.filters.sortBy}
            onChange={this.onSortChange}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <div className="filter__date-picker">
            <DateRangePicker
              startDate={this.props.filters.startDate} 
              startDateId="transactionStartDate"   
              endDate={this.props.filters.endDate}
              endDateId="transactionEndDate"   
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={()=>false}
            />
          </div>
          
        </div>
      )
    }
  
  };
  
  const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate : () => dispatch(sortByDate()),
    sortByAmount : () => dispatch(sortByAmount())
  });
  
  const mapStateToProps = (state) => {
    return {
      filters: state.filters
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(TransactionListFilters);