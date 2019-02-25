import React from 'react';
//import {Link} from 'react-router-dom';
import moment from 'moment';
//import numeral from 'numeral';
 
const ExpenseListItem = ({ id, description, amount, postedAt}) => (
   
        <div>
        <input type="checkbox" name="selectTransaction" value="true"></input>
        <span className="">  {moment(postedAt).format('MMMM Do, YYYY')}</span>
        <h3 className="">{description}</h3>
        <h3 className=""> {amount} </h3>
        <select>
          <option value="monthly">Monthly</option>
          <option value="biweekly">Bi-weekly</option>
        </select>
        <img id={'editButton'} src={'/images/edit.svg'} 
      alt={'Edit'} width={'20'} height={'20'}></img>
      <img id={'deleteButton'} src={'/images/delete.svg'} 
      alt={'Delete'} width={'20'} height={'20'}></img>
        </div>
);
 
export default ExpenseListItem;