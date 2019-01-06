import React from 'react';
import ReactDom from 'react-dom';

const Bug = () => {
    throw (new Error('BUG'));
    return <div>Bug</div>
}

export default Bug;