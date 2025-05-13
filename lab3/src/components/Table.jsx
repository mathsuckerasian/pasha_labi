import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Table = ({ data }) => {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortField) return 0;
        return sortOrder === 'asc' ? a[sortField] > b[sortField] ? 1 : -1 : a[sortField] < b[sortField] ? 1 : -1;
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                            {key} {sortField === key ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((item) => (
                    <tr key={item.id}>
                        {Object.values(item).map((val, idx) => (
                            <td key={idx}>{val}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
