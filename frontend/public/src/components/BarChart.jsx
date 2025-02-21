import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../utils/api';

const BarChart = ({ month }) => {
    const [barData, setBarData] = useState({});

    useEffect(() => {
        fetchBarChartData();
    }, [month]);

    const fetchBarChartData = async () => {
        const response = await getBarChartData(month);
        setBarData(response.data);
    };

    const chartData = {
        labels: Object.keys(barData),
        datasets: [
            {
                label: 'Number of Items',
                data: Object.values(barData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="bar-chart">
            <h3>Bar Chart for {month}</h3>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;