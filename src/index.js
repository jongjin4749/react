import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
    state = {
        counter : 0
    }

    parentButton = () => {
        this.setState((state, props) => {
            return {counter: state.counter + 1}
        });
    }

    render() {
        console.log("parent");
        return (
            <React.Fragment>
                <button onClick={this.parentButton}>부모 버튼</button>
                <div>{this.state.counter}</div>
                <Child/>
            </React.Fragment>
        );
    }
}


export default class Child extends React.Component {
    state = {
        counter : 0
    }

    childButton = () => {
        this.setState((state, props) => {
            return {counter: state.counter + 1};
        });
    }

    render() {
        console.log("child");
        return (
            <React.Fragment>
                <button onClick={this.childButton}>자식 버튼</button>
                <div>{this.state.counter}</div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));