import React, { useState, useEffect } from 'react';
import { getStatistics } from '../utils/api';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        fetchStatistics();
    }, [month]);

    const fetchStatistics = async () => {
        const response = await getStatistics(month);
        setStatistics(response.data);
    };

    return (
        <div className="statistics">
            <h3>Statistics for {month}</h3>
            <p>Total Sale: ${statistics.total_sale}</p>
            <p>Sold Items: {statistics.sold_items}</p>
            <p>Not Sold Items: {statistics.not_sold_items}</p>
        </div>
    );
};

export default Statistics;