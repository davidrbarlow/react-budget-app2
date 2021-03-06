import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';


class TransactionListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };
  onDatesChange = ({startDate, endDate}) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

  onFocusChange = (calendarFocused) =>{
    this.setState(()=>({calendarFocused}))
  };

  render(){
      return (
        <div className="filters">
          <input 
            type="text" 
            className="input-text input-text__filter filters__text-input "
            placeholder = "Search Expenses"
            value={this.props.filters.text} 
            onChange={(e)=>{
                this.props.dispatch(setTextFilter(e.target.value));
          }}/>
          <select className="select select__filter filters__select"
            value={this.props.filters.sortBy}
            onChange={(e)=>{
            if (e.target.value === 'date') 
            {
              this.props.dispatch(sortByDate())
            } else if (e.target.value === 'amount'){
              this.props.dispatch(sortByAmount());
            } 
            }}
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
  
  
  const mapStateToProps = (state) => {
    return {
      filters: state.filters
    };
  };
  export default connect(mapStateToProps)(TransactionListFilters);