import React from 'react';
import Buttons from './components/Buttons';
import Counter from './components/Counter';
import Table from './components/Table';
import './init';

const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 22 }
];

const App = () => {
    return (
        <div className="container mt-5">
            <h2>Buttons Component</h2>
            <Buttons />
            <h2>Counter Component</h2>
            <Counter />
            <h2>Table Component</h2>
            <Table data={data} />
        </div>
    );
};

export default App;
