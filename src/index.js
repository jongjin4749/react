import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 사용할 태그, 속성 객체, 텍스트 값 혹은 새로 생성하는 엘리먼트의 자식 엘리먼트
// 세 번째 매개변수가 문자열이면 엘리먼트의 텍스트 값이며 아니라면 새로 생성하는 엘리먼트의 자식 엘리먼트
let reactElement = React.createElement('h1', {name : 'kjj'}, 'Hello world');

// render 함수에는 하나의 React 엘리먼트만 인자로 전달 할 수 있다.
// ReactDOM.render(reactElement, document.getElementById('root'));

// 만약, 다수의 h1 태그를 넣고 싶다면 div 또는 span을 선택하여 아래와 같이 사용하면 된다.(매개변수 갯수 제한 없음)
// let reactMultiElement = React.createElement('div', null, reactElement, reactElement);
// ReactDOM.render(reactMultiElement, document.getElementById('root'));

// 개인적으로, div나 span은 자주 사용되는 태그이고 한번 더 감싸는 복잡도가 있으므로 Fragment를 사용하는게 좋다고 생각한다.
// let reactMultiElement = React.createElement(React.Fragment, null, reactElement, reactElement);
// ReactDOM.render(React.createElement(React.Fragment, null, reactMultiElement), document.getElementById('root'));


// 만약 Hello World를 컴포넌트화 한다면 아래와 같이 사용하면 좋을 것 같다
// React 컴포넌트 클래스 이름은 대문자로 시작한다.
class HelloWorld extends React.Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}
export default HelloWorld;
ReactDOM.render(React.createElement(React.Fragment, null, <HelloWorld/>, <HelloWorld/>), document.getElementById('root'));
