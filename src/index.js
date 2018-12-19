import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * 3.3 Babel을 이욯한 jsx 트랜스파일러 설정하기
 *  마지막으로, 브라우저는 JSX를 실행 시킬 수 없다.
 *  브라우저는 오직 자바스크립트만 실행할수 있으므로 jsx를 보통의 자바스크립트로 변환해야한다
 *  그렇게 바꿔주는것이 바로  babel이다
 *
 * 바벨을 사용하는 여러가지 방법이 있는데 가장 인기 좋은건 Webpack 같은 도구에서 Babel을 플러그인으로 사용하는 것
 * Babel의 주용 기능은 ES6+/ES2015+ 컴파일러이지만 JSX를 자바스크립트로 변환하기도함(REACT 팀도 공식적으로 BABEL을 사용하라고 권장함)
 * ES6, ES2015이란? -> 아래링크참고
 * https://luckydavekim.github.io/web/2018/02/07/what-is-the-ecmascript/
 *
 * ie9 같은 구형 브라우저를 지원해야하고 ES6+/ES2015+를 사용하고 싶다면 baebl-preset-es2015 트랜스파일러를 추가해야함
 * 하는걸 권장하지는 않지만 필요하다면 이렇게 해라(의존성이 늘어나고 복잡한 코드가됨)
 *
 *
 */


/**
 * 3.4. React와 JSX의 까다로운 부분
 * - 태그를 닫을 때 반드시 슬래시를 넣어야함
 * - html 엔터티 코드를 사용할때 정적인 코드는 가능하게 나옴
 * - html 엔터티 코드를 변수에 담아 사용하면 이스케이프 처서 나옴
 * - 그이유는 react/JSX는 위험한 HTML 구문에 대해 자동으로 이스케이프 함(보안)
 */
class HelloWorld extends React.Component {
  getUrl() {
    return 'http://www.afreecatv.com';
  }
  render() {
    let specialChars = '&copy;&mdash;&ldquo;';
    let specialChars2 = '<script>alert(1);</script>';
    let styleTest = {
        backgroundColor : 'red',
        fontSize : 20
    };

    return (
        <React.Fragment>
            <a href={this.getUrl()}>{this.getUrl()}</a><br/>
            <span>&copy;&mdash;&ldquo;</span><br/>
            {/** 아래와 같이 했더니 에러남 readOnly속성을 주든 onchange이벤트 주라고 에러남
            왜냐 리엑트는 value 속성이 들어가면 onChange이벤트를 넣던지 readOnly 속성을 넣어서 변화를 막으라고함
            자세한 정보는 https://note.redgoose.me/article/1611/*/}
            {/**<input value="&copy;&mdash;&ldquo;"/>**/}
            <input value="&copy;&mdash;&ldquo;" readOnly/><br/>
            <span key="specialChars">{specialChars}</span><br/>
            <input value={specialChars} readOnly/><br/>
            <span>{specialChars2}</span><br/>

            {/** 이스케이프가 안먹게 사용하고 싶다면 아래와 같이 사용*/}
            {/**<span>{[<span>&copy;</span>]}</span><br/>*/}

            {/** jsx의 스타일 속성은 일반적인 HTML과 다르게 동작함, JSX에서는 문자열 대신 자바스크립트 객체를 전달하고
                CSS 속성은 카멜 표기법으로 작성**/}
            <span style={styleTest}>하이 스타일테스트</span><br/>


            {/** REACT JSX는 CLASS와 FOR를 제외하면 표준 html 속성 모두 사용 가능
            class와 for는 자바스크립트와 ECMAscript 예약어이고, jsx는 일반 자바스크립트로 변환해서 사용한다.
            따라서 class와 for대신 classsName과 htmlFor를 사용함
            */}
           <span className="jongjin">클래스테스트</span><br/>
           <input type="radio" name={this.props.name} id={this.props.id} />
           <label htmlFor={this.props.id}>{this.props.name}</label>
           <br/>

           {/** bool 값을 속성 값으로 사용하는 경우
            disabled, required, checked, autofocus, readOnly같은 일부 속성은 폼요소에만 사용
            중요한점은 속성 값을 {}안에 반드시 자바스크립트 식으로 작성(문자열로 입력하지 않도록해야함)
            안그러면 에러남
            추가적으로, 속성 값을 생략하면 React는 생략된 값을 true로 간주함

            자바스크립트와 Node.js는 거짓이 아니라면 참이라고 간주함(거짓인 값은 총 6가지 경우가있음)
            - false, 0, ""(공백문자열), null, undefined, NaN
            if (false) { console.log(1) };
            if (0) { console.log(1) };
            if ("") { console.log(1) };
            if (null) { console.log(1) };
            if (undefined) { console.log(1) };
            if (NaN) { console.log(1) };

           */}
          <input disabled={false}/><br/>
          <input disabled/>
        </React.Fragment>
    );
  }
}

export default HelloWorld;
ReactDOM.render(
  <React.Fragment>
    <HelloWorld id="jongjin4749" name="kim"/>
  </React.Fragment>
  ,document.getElementById('root')
);





