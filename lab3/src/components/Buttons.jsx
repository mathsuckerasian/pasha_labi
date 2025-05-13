import React from 'react';
import { useImmer } from 'use-immer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Buttons = ({ count = 3 }) => {
    const [counters, updateCounters] = useImmer(Array(count).fill(0));
    const [lastClicked, setLastClicked] = React.useState(null);

    const handleClick = (index) => {
        updateCounters(draft => { draft[index] += 1; });
        setLastClicked(index);
    };

    return (
        <div>
            {counters.map((value, index) => (
                <button
                    key={index}
                    className={`btn m-1 ${lastClicked === index ? 'btn-success' : 'btn-primary'}`}
                    onClick={() => handleClick(index)}
                >
                    {value}
                </button>
            ))}
        </div>
    );
};

export default Buttons;
