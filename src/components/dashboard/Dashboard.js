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
                                <img alt="Logo" src="../../../assets/media/svg/misc/layer.svg" className="h-60px me-5" />


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
