import React from 'react';
import ReactDom from 'react-dom';
export default class Input extends React.Component {

    constructor(props) {
        super(props);
    }

    confirmLeave(e) {
        let message = '정말 닫을래?';
        e.returnValue = message;
        return message;
    }
    // 서버 렌더링 시에 호출되지 않고 브라우저에서만 호출되기 떄문이다.
    componentDidMount() {
        console.log('beforeunload 이벤트에 confirmLeave 이벤트 리스너 등록');
        window.addEventListener('beforeunload', this.confirmLeave);
    }

    componentWillUnmount() {
        console.log('beforeunload 이벤트에 confirmLeave 이벤트 리스너 제거');
        window.removeEventListener('beforeunload', this.confirmLeave);
    }

    render() {
        console.log('Input render');
        return (
            <React.Fragment>
                <h1>부모 컴포넌트는 {this.props.secondsLeft}초 뒤에 제거</h1>
                <input type="text"/>
            </React.Fragment>
        )

    }
}