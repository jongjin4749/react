import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
1. props
- 속성은 컴포넌트 내부에서는 변경할 수 없는 값(불변 객체이며 Object.isFrozen()함수를 활용하여 true인 것을 확인 할 수 있다)
- 부모 컴포넌트는 자식의 생성 시점에 속성을 할당함
- React는 HTML 표준 속성(href, title, style, class..등)에 해당하는지 속성 이름을 비교하고 일치하면 HTML 속성으로 사용하고 아니면 HTML에 렌더링 하지 않았었다.
  그러나 REACT 16버전 이후 부터 표준이 아닌 HTML 속성도 렌더링하도록 변경되었다.
**/


// class HelloWorld extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.id}</h1>
//         <h1>{this.props.password}</h1>
//       </div>
//     );
//   }
// }
// export default HelloWorld;
// ReactDOM.render(React.createElement('div', null, React.createElement(HelloWorld, {id:'test1',password:'1234'}), React.createElement(HelloWorld, {id:'test1',password:'1234'})), document.getElementById('root'));



// 이 방식이 좀더 가독성이 나은듯
// props 전체를 data={this.props}와 같이 전달 할 수도 있음
class HelloWorld extends React.Component {
  render() {
    console.log(Object.isFrozen(this.props));
    return (
      <React.Fragment>
        <h1 data={this.props}>{this.props.id}</h1>
        <h1>{this.props.password}</h1>
      </React.Fragment>
    );
  }
}

export default HelloWorld;
ReactDOM.render(
  <React.Fragment>
    <HelloWorld id="test1" password="123"/>
    <HelloWorld id="test2" password="456"/>
    <HelloWorld id="test3" password="789"/>
  </React.Fragment>
  ,document.getElementById('root')
);