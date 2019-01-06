import React from 'react';
import ReactDom from 'react-dom';
import Input from './component/Form/Input';

let secondsLeft = 5;
let interval = setInterval(() => {
    if (secondsLeft == 0) {
        ReactDom.render(
            <div>Note was removed after {secondsLeft} seconds.</div>, document.getElementById('root')
        );
        clearInterval(interval);
    } else {
        ReactDom.render(
            <Input secondsLeft={secondsLeft}/>, document.getElementById('root')
        );
    }
    secondsLeft--
}, 1000);