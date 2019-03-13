import React from 'react';
import {connect} from 'react-redux';
import NavIcons from './NavIcons';
import Header from './Header';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';
import TransactionListControls from './TransactionListControls';

import { logout } from '../actions/auth';


class BudgetDashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.onUnload = this.onUnload.bind(this); // if you need to bind callback to this
    }

    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        this.nv.removeEventListener("nv-enter", this.handleNvEnter);
      }

      componentDidMount() {
        // When the component is mounted, add your DOM listener to the "nv" elem.
        // (The "nv" elem is assigned in the render function.)
        this.nv.addEventListener("nv-enter", this.handleNvEnter);
      }

      handleNvEnter = (event) => {
        console.log("Nv Enter:", event);
      }


    onUnload = (event) => {
        console.log("hellooww");
        event.returnValue = "Hellooww";
        this.props.logout(this.props.token);
    }

    render() {
        return (
            <div className="layout">
                <div className="layout--top-left-corner"></div>
                <div className="layout--header">
                    <Header />
                </div>
                <div className="layout--nav-icon">
                    <NavIcons />
                </div>
                <div className="layout--filters">
                    <TransactionListFilters />
                </div>
            
                <div className="layout--controls">
                    <TransactionListControls />
                </div>
                <div className="layout--transactions">
                    <TransactionList />
                </div>       
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout: (token) => dispatch(logout(token))
    };
} ;

const mapStateToProps = (state) => {
    return {
        authToken: state.auth.authToken,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BudgetDashboardPage);