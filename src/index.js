import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * 3.2.5 컴포넌트에 메서드 사용하기
 * 컴포넌트 내부에서 메서드를 선언 할 수 있고 jsx에서 해당 함수를 호출 할 수 있다
 * 그외에 jsx 함수 내에서는 웬만하면 if else 쓰지말고 삼항 연산자 쓰고 jsx 밖에서는 상황에 맞게 ifelse쓰든 삼항연산자써라
 */
class HelloWorld extends React.Component {
  getUrl() {
    return 'http://www.afreecatv.com';
  }
  render() {
    return (
        <a href={this.getUrl()}>{this.getUrl()}</a>
    );
  }
}

export default HelloWorld;
ReactDOM.render(
  <React.Fragment>
    <HelloWorld/>
  </React.Fragment>
  ,document.getElementById('root')
);