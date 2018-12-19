import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/** 1. 데이터를 DOM 요소에 속성으로 저장해서 쓰는 것은 일반적으로 안티패턴으로 여겨진다.
- DOM을 데이터베이스나 프론트엔드 데이터 저장소로 사용하는 것은 적절하지 않음
- 또한 DOM에서 데이터를 가져오는 것은 메모리 상의 가상 저장소에서 데이터를 가져오는 것보다 느림

결론 제일 권장하는 방식은 아래와 같다
, data- attributes are probably a better approach, but in most cases data should be kept in React component state or external stores.
(https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)
**/

// 만약 여러 단계의 부모->자식1->자식2->자식3 컴포넌트가 있다고 가정하자
// 여기서 부모에서 갖고있는 모든 속성을 죄종 자식3한테 전달하려고할때 각 속성을 수동으로 전달해야하는 경우 굉장히 번거롭고 안티패턴이다.
// 그럴때는 아래와 같이 ...this.props(펼침연산자)를 사용하면 다 전달할 수 있다
class HelloWorld extends React.Component {
    /** 펼침 연산자 배열을 바꾸지 않고 새로운 값을 복사, 배열을 합치거나 배열을 펼쳐진 상태로 파라메터로 전달 등의 활용이 가능
        자세한 내용은 아래 url 참고
        https://junhobaik.github.io/js-es6-spread-operator/
        https://wayhome25.github.io/javascript/2017/02/18/js-oop-1/
    */
  render() {
    return (
        <h1 {...this.props}>React is awesome!</h1>
    );
  }
}

export default HelloWorld;
ReactDOM.render(
  <React.Fragment>
    <HelloWorld id="test1" password="123" awesome="true"/>
    <HelloWorld id="test2" password="456" awesome="false"/>
  </React.Fragment>
  ,document.getElementById('root')
);