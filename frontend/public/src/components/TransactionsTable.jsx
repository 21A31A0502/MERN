import React, { useState, useEffect } from 'react';
import { getTransactions } from '../utils/api';
import './Table.css';

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchTransactions();
    }, [month, search, page]);

    const fetchTransactions = async () => {
        const response = await getTransactions(month, search, page);
        setTransactions(response.data.transactions);
        setTotal(response.data.total);
    };

    return (
        <div className="transactions-table">
            <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id}>
                            <td>{t.title}</td>
                            <td>{t.description}</td>
                            <td>{t.price}</td>
                            <td>{t.dateOfSale}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)} disabled={page * 10 >= total}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;