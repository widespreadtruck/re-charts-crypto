import React from 'react';

const Button = ({ period, setStartDate, children }) => {

    const handleClick = () => {
        const date = new Date();
        const setDate = date.setDate(date.getDate() - period);
        // console.log('Set new start date. # of days from today:', period);
        setStartDate(new Date(setDate));
    };

    return (
        <button 
            onClick={handleClick}
            period={period}
        >
        {children}
        </button>
    )
}

export default Button;
