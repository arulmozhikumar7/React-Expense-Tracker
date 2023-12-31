
const exportService = {
    exportToCSV: (data) => {
        const csvContent = `data:text/csv;charset=utf-8,
        Transaction Date,Description,Amount,Category,Type
        ${data.map(formatTransaction).join('\n')}`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'financial_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
};

const formatTransaction = (transaction) => {

    return `${transaction.date},${transaction.description},${transaction.amount},${transaction.category},${transaction.type}`;
};

export default exportService;
