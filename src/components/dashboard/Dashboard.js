import React, { useState } from 'react';
import TransactionForm from '../common/TransactionForm';
import TransactionList from '../common/TransactionList';
import Chart from '../common/Chart';
import api from '../../services/api';

const Dashboard = () => {
    const [transactions, setTransactions] = useState(api.getAllTransactions());

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleAddTransaction = (transaction) => {
        const existingTransaction = transactions.find((t) => t.id === transaction.id);

        if (existingTransaction) {

            console.log('Removing existing transaction:', existingTransaction);


            api.deleteTransaction(existingTransaction.id);


            console.log('Existing transaction removed:', existingTransaction);

            setTransactions((prevTransactions) =>
                prevTransactions.filter((t) => t.id !== existingTransaction.id)
            );
        }


        console.log('Adding new transaction:', transaction);


        api.addTransaction(transaction);


        console.log('New transaction added:', transaction);

        setTransactions((prevTransactions) => [...prevTransactions, transaction]);

        setSelectedTransaction(null);
    };


    const handleDeleteTransaction = (transactionId) => {
        api.deleteTransaction(transactionId);
        setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction.id !== transactionId)
        );
        console.log('handleDeleteTransaction called');
    };


    const expenseTransactions = transactions.filter((transaction) => transaction.type === 'expense');
    const incomeTransactions = transactions.filter((transaction) => transaction.type === 'income');
    const handleEditTransaction = (transactionId) => {

        api.deleteTransaction(transactionId);
        setTransactions((prevTransactions) =>
            prevTransactions.filter((t) => t.id !== transactionId)
        );


        const transactionToEdit = transactions.find((t) => t.id === transactionId);
        setSelectedTransaction(transactionToEdit);
    };
    const getBalance = () => {
        const incomeTransactions = transactions.filter((transaction) => transaction.type === 'income');
        const expenseTransactions = transactions.filter((transaction) => transaction.type === 'expense');

        const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalExpense = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        return totalIncome - totalExpense;
    };
    const getIncome = () => {
        const incomeTransactions = transactions.filter((transaction) => transaction.type === 'income');
        const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        return totalIncome;
    }
    return (
        <div className="app-wrapper  flex-column flex-row-fluid " id="kt_app_wrapper">


            <div id="kt_app_toolbar" className="app-toolbar  py-6 "

            >


                <div id="kt_app_toolbar_container" className="app-container  container-xxl d-flex align-items-start ">

                    <div className="d-flex flex-column flex-row-fluid">



                        <div className="d-flex flex-stack flex-wrap flex-lg-nowrap gap-4 gap-lg-10 pt-6 pb-18 py-lg-13">


                            <div className="page-title d-flex align-items-center me-3">

                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.162 0C12.249 0 0 11.4 0 30.162C0 48.075 12.249 60 30.162 60C48.075 60 60 48.075 60 30.162C60 11.4 48.075 0 30.162 0ZM47.979 47.979C46.8114 49.1418 45.5092 50.161 44.1 51.015V26.4L38.7 23.4V53.4C36.7459 53.9824 34.7339 54.3496 32.7 54.495V15.045L27.3 12.045V54.477C25.3689 54.3176 23.459 53.9618 21.6 53.415V25.2L16.2 28.2V51.057C9.387 46.998 5.4 39.657 5.4 30.15C5.4 22.521 7.731 16.206 12.144 11.886C16.482 7.647 22.713 5.4 30.162 5.4C37.611 5.4 43.737 7.638 48 11.868C52.323 16.17 54.6 22.497 54.6 30.168C54.6 37.5 52.311 43.65 47.979 47.979Z" fill="white" />
                                </svg>
                                &nbsp;



                                <h1 className="page-heading d-flex text-white fw-bolder fs-2 flex-column justify-content-center my-0">
                                    Expense Tracker Application

                                    <span className="page-desc text-white opacity-50 fs-6 fw-bold pt-4">
                                        Made by Arulmozhikumar            </span>

                                </h1>

                            </div>



                            <div className="d-flex gap-4 gap-lg-13">

                                <div className="d-flex flex-column">

                                    <span className="text-white fw-bold fs-3 mb-1">₹ {getBalance().toFixed(2)}</span>



                                    <div className="text-white opacity-50 fw-bold">Total Balance</div>

                                </div>


                                <div className="d-flex flex-column">

                                    <span className="text-white fw-bold fs-3 mb-1">₹ {getIncome().toFixed(2)}</span>



                                    <div className="text-white opacity-50 fw-bold">Total Income</div>

                                </div>


                                <div className="d-flex flex-column">

                                    <span className="text-white fw-bold fs-3 mb-1">₹ {(getIncome() - getBalance()).toFixed(2)}</span>



                                    <div className="text-white opacity-50 fw-bold">Total Spending</div>

                                </div>





                            </div>

                        </div>

                    </div>
                </div>

            </div>




            <div className="app-container  container-xxl ">



                <div className="app-main flex-column flex-row-fluid" id="kt_app_main">

                    <div className="d-flex flex-column flex-column-fluid">



                        <div id="kt_app_content" className="app-content " >

                            <div className="card">

                                <div className="card-body">


                                    <TransactionForm onSubmit={handleAddTransaction} selectedTransaction={selectedTransaction} />
                                    <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} onEdit={handleEditTransaction} />


                                    <h3>Expense Chart</h3>
                                    <Chart data={expenseTransactions} dataKey="amount" dataLabel="description" />


                                    <h3>Income Chart</h3>
                                    <Chart data={incomeTransactions} dataKey="amount" dataLabel="description" />






                                </div>

                            </div>
                        </div>

                    </div>




                    <div id="kt_app_footer" className="app-footer  d-flex flex-column flex-md-row align-items-center flex-center flex-md-stack py-2 py-lg-4 " >

                        <div className="text-dark order-2 order-md-1">
                            <span className="text-muted fw-semibold me-1">2023&copy;</span>
                            <a href="https://github.com/arulmozhikumar7" target="_blank" rel="noreferrer" className="text-gray-800 text-hover-primary">Github - arulmozhikumar7</a>
                        </div>



                        <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                            <li className="menu-item"><a href="https://github.com/arulmozhikumar7/React-Expense-Tracker" target="_blank" rel="noreferrer" className="menu-link px-2">About</a></li>

                            <li className="menu-item"><a href="https://github.com/arulmozhikumar7/React-Expense-Tracker" target="_blank" rel="noreferrer" className="menu-link px-2">Support</a></li>


                        </ul>
                    </div>
                </div>



            </div>

        </div>
    );
};

export default Dashboard;
