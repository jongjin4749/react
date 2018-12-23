import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
4.4 상태비저장 컴포넌트
- 상태 객체 가질 수 없음
- 메서드 또는 라이프 사이클 이벤트 없음
- propType와 defaultProps를 가질 수는 있음(8장에서배움)
- refs를 사용할 수 없다 (7장에서 배움)
- 상태비버장 컴포넌트를 가능한 한 많이 사용하는것이 React 에서 제시하는 방향
//  */
const Clock = (props) => {
    // 엘리먼트를 return과 같은 라인에서 시작하면 return 뒤에 여는 괄호를 넣지 않아도됨
    return <h1>{props.name}</h1>
}

// 클래스형 컴포넌트보다 함수형 컴포넌트가 보다 코드도 짧고 편리함
// class Clock extends React.Component {
//     render() {
//         // 엘리먼트를 return과 같은 라인에서 시작하면 return 뒤에 여는 괄호를 넣지 않아도됨
//         return <h1>{this.props.name}</h1>
//     }
// }

ReactDOM.render(<Clock name="jongjin"/>, document.getElementById('root'));