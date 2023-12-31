import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {


    const groupedData = data.reduce((acc, transaction) => {
        const { category, amount, type } = transaction;
        acc[category] = acc[category] || { category, income: 0, expense: 0 };
        acc[category][type] += amount;
        return acc;
    }, {});

    const chartData = Object.values(groupedData);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="category" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" stackId="stack" fill="#82ca9d" barSize={25} />
                <Bar dataKey="expense" stackId="stack" fill="#ff6f61" barSize={25} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;
