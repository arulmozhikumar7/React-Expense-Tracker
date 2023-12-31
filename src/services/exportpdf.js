import { jsPDF } from 'jspdf';

const exportToPDF = (transactions) => {
    const pdf = new jsPDF();
    pdf.text('Transaction Report', 20, 10);

    transactions.forEach((transaction, index) => {
        const rowPosition = 20 + index * 20;

        const transactionText = `
            Date: ${transaction.date}
            Description: ${transaction.description}
            Amount: ${transaction.amount}
            Category: ${transaction.category}
            Type: ${transaction.type}
            -------------------------------------------
        `;

        pdf.text(transactionText, 20, rowPosition);
    });

    pdf.save('transaction_report.pdf');
};

const pdfExportService = {
    exportToPDF,
};

export default pdfExportService;
