import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setActivePage} from '../actions/pageEdits';

const NavIcons = (props) => (
    <div className="nav-icons">
      
    <Link to='dashboard'>
      <img id={'transactionsButton'} className="nav-icon"  src={'/images/transactions.svg'} 
      alt={'Transactions'} onClick={()=>{props.setActivePage('dashboard')}}></img>
    </Link>
      
      
    <Link to='/projection'> 
      <img id={'projectionButton'} className="nav-icon"  src={'images/projection.svg'} 
      alt={'Projections'} onClick={()=>{props.setActivePage('projection')}}
      ></img>
    </Link>
      
    </div>
);

const mapDispatchToProps = (dispatch) => ({
  setActivePage: (page) => dispatch(setActivePage(page))
});


export default connect(undefined, mapDispatchToProps)(NavIcons);

