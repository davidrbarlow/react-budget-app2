import React from 'react';
//import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
 
const ExpenseListItem = ({ id, description, amount, postedAt}) => (
   
        <div className="data-grid">
            <div className="invisible">
               New Row
            </div>
            <input type="checkbox" name="selectTransaction" value="true" className="show-for-desktop checkbox"></input>
            <div className="date" >{moment(postedAt).format('MMMM Do, YYYY')}</div>
            <div className="description-mobile show-for-mobile description" >{description}</div>
            <div className="description show-for-desktop" >{description}</div>
            <div className="amount"> {numeral(amount/100).format('$0,0.00')} </div>
            <select className="select-transaction" >
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
 
export default ExpenseListItem;