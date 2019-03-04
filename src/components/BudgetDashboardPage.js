import React from 'react';
import NavIcons from './NavIcons';
import Header from './Header';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';
import TransactionListControls from './TransactionListControls';


const BudgetDashboardPage = () => (
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

export default BudgetDashboardPage;