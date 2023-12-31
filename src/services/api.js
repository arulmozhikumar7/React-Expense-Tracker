// src/services/api.js
const api = {
    transactions: [],

    initializeTransactions: () => {

        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        api.transactions = storedTransactions;
    },

    getAllTransactions: () => {
        return api.transactions;
    },

    addTransaction: (transaction) => {
        transaction.id = new Date().getTime();
        api.transactions.push(transaction);


        localStorage.setItem('transactions', JSON.stringify(api.transactions));
    },

    updateTransaction: (updatedTransaction) => {
        const index = api.transactions.findIndex((t) => t.id === updatedTransaction.id);
        if (index !== -1) {
            api.transactions[index] = updatedTransaction;


            localStorage.setItem('transactions', JSON.stringify(api.transactions));
        }
    },

    deleteTransaction: (transactionId) => {
        api.transactions = api.transactions.filter((t) => t.id !== transactionId);


        localStorage.setItem('transactions', JSON.stringify(api.transactions));
    },


};

api.initializeTransactions();

export default api;
