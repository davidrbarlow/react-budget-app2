import React from 'react';
import SideBar from './SideBar';
import Header from './Header';
import TransactionList from './TransactionList';
import TransactionListFilters from './TransactionListFilters';
import TransactionListControls from './TransactionListControls';


const BudgetDashboardPage = () => (
    <div>
        <Header />
        <SideBar />
        <TransactionListFilters />
        <TransactionListControls />
        <TransactionList />
    </div>
);

export default BudgetDashboardPage;