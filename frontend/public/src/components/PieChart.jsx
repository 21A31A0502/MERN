import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { getPieChartData } from '../utils/api';

const PieChart = ({ month }) => {
    const [pieData, setPieData] = useState({});

    useEffect(() => {
        fetchPieChartData();
    }, [month]);

    const fetchPieChartData = async () => {
        const response = await getPieChartData(month);
        setPieData(response.data);
    };

    const chartData = {
        labels: Object.keys(pieData),
        datasets: [
            {
                label: 'Number of Items',
                data: Object.values(pieData),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    return (
        <div className="pie-chart">
            <h3>Pie Chart for {month}</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;