import React from 'react';
import {connect} from 'react-redux';
//import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
 //
const ExpenseListItem = (props) => (
   
        <div className="data-grid">
            
            <input type="checkbox" display="none" name="selectTransaction" value="true" 
              className="show-for-desktop checkbox" 
              disabled={props.pageEdits.addTransaction}
              >
            </input>
            <div className="date" >{moment(props.postedAt).format('MMMM Do, YYYY')}</div>
            <div className="description-mobile show-for-mobile description" >{props.description}</div>
            <div className="description show-for-desktop" >{props.description}</div>
            <div className="amount"> 
               {numeral(props.amount/100).format('$0,0.00')} 
            </div>
            <input
            className="amount"
              type = "text"
              value={props.amount}
              disabled
              style={{border:"none"}}
              outline="none"
            >
            </input>
            <select className="select-transaction" >
              <option value="NA"></option>
              <option value="monthly">Monthly</option>
              <option value="biweekly">Bi-weekly</option>
              
            </select>
            <div className="icons show-for-desktop">
              <input type="image" id={'editButton'} src={'/images/edit.svg'} 
              alt={'Edit'} width={'20'} height={'20'}/>
              <input type="image" id={'deleteButton'} src={'/images/delete.svg'} 
              alt={'Delete'} width={'20'} height={'20'}/>
            </div>
            
        
        </div>
);
 
const mapStateToProps = (state) => {
     return {
       pageEdits: state.pageEdits
     };
 }
  
  
 export default connect(mapStateToProps)(ExpenseListItem);
