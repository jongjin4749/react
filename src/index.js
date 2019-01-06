import React from 'react';
import ReactDom from 'react-dom';

class Index extends React.Component {

    constructor(props) {
        console.log("parent constructor");
        super(props);
        this.state = {
            name : 'jongjin',
            year : '2018'
        }
    }

    // 랜더되기 전 호출되는 함수인데 v16.3에서 deprecated되었고 용도는 서버사이드 호출 용도로 사용됐었음
    componentWillMount() {
        console.log("parent componentWillMount");
        // render 아직 하지 않아 dom에 아직 추가가 되지 않은 상황에서 해당 함수를 호출하면 null
        console.log("ReactDom.findDOMNode(this)", ReactDom.findDOMNode(this));
    }

    // 랜더 후 호출되며 D3, Masonry, AJAX와 같은거 할때 사용하는 위치이며 componentWillMount에서 햇던 역할도 수행가능
    // 이때, 컴포넌트의 엘리먼트가 실제 DOM에 반영되어 자식 엘리먼트를 포함한 모든 엘리먼트에 접근 할 수 있기 때문
    componentDidMount() {
        console.log("parent componentDidMount");
        // render 이후 호출되므로 텍스트를 포함한 첫 엘리먼트를 반환함
        console.log("ReactDom.findDOMNode(this)", ReactDom.findDOMNode(this));

        setTimeout(() => {
          this.setState({ year: "2019" });
        }, 3000);
        // setTimeout(function() {
            // console.log("this state name=", this.state.name);
        // }, 5000);
    }

    // 새로운 props를 받게 됐을 떄 호출 되며 주로, stat가 props에 따라 변해야하는 로직을 작성함
    // nextProps는 새로 받게 될 props이고 this.props를 조회하면 업데이트 되기 전 속성 값이므로 참고하세요.
    componentWillReceiveProps(nextProps) {
        console.log("parent componentWillReceiveProps");
    }

    // https://codesandbox.io/s/vny421jxyl(getSnapshotBeforeUpdate, componentDidUpdate) 사용법
    // https://velopert.com/3631
    render() {
        console.log("parent render");
        return (
                <Child name={this.state.name}/>
        );
    }
}

export default class Child extends React.Component {
    constructor(props) {
        console.log("child constructor");
        super(props);
        this.state = {
            name : this.props.name
        }
    }

    // 랜더되기 전 호출되는 함수인데 v16.3에서 deprecated되었고 용도는 서버사이드 호출 용도로 사용됐었음
    // componentWillMount() {
    //     console.log("child componentWillMount");
    // }

    // 랜더 후 호출되며 D3, Masonry, AJAX와 같은거 할때 사용하는 위치이며 componentWillMount에서 햇던 역할도 수행가능
    componentDidMount() {
        console.log("child componentDidMount");
    }

    // 새로운 props를 받게 됐을 떄 호출 되며 주로, stat가 props에 따라 변해야하는 로직을 작성함
    // nextProps는 새로 받게 될 props이고 this.props를 조회하면 업데이트 되기 전 속성 값이므로 참고하세요.
    // v16.3부터 depecate 됨
    // componentWillReceiveProps(nextProps) {
    //     console.log("child componentWillReceiveProps");
    // }

    // 이 기능은 상황에 따라 componentWillReceiveProps를 대체함
    // 특정 props가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하며
    // 사용법은 setState를 하는 것이 아니라 아래와 같이하면 됨
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("child getDerivedStateFromProps");
        console.log("child getDerivedStateFromProps nextProps", nextProps);
        console.log("child getDerivedStateFromProps prevState", prevState);
        if (nextProps.name !== prevState.name) {
            console.log("return name=", nextProps.name);
            return { name : nextProps.name };
        }
        // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
        console.log("return null");
        return null;
    }

    // 컴포넌트 최적화에 유용함 리액트에서 변화가 발생한 부분만 감지해내기 위해서는 Virtual DOM에 한번 그려야함
    // 즉, 현재 컴포넌트의 상태가 없데이트되지 않아도, 부모컴포넌트가 리렌더링되면, 자식들도 리렌더링됨
    // 여기서 리렌더링이란 render함수를 뜻함. 물론 renduer함수가 호출된다고해서 반드시; DOM 조작하는 것은 아님
    // 그냥 Virutal DOM에만 렌더링 할뿐이다. 이 작업이 그렇게 많은 부하가 있는 건 아니지만
    // 컴포넌트가 무수히 많아 렌더링 된다면 이건 또다른 얘기임(CUP 자원을 사용함) 따라서 Virutal DOM에 리렌더링 하는것도
    // 불필요할 경우 아래 함수를 사용하여 Virutal DOM에 리렌더링 안시키는 것도 중요함
    shouldComponentUpdate(nextProps, nextState) {
        // 기본적으로 true를 반환하고 우리가 따로 false를 반환하면 해당 조건에는 render 함수를 호출하지 않음
        if (nextProps.name === nextState.name) {
            console.log("false");
            return false;
        }
        return true;
    }

    // shouldComponentUpdate가 true를 반환했을 때만 호출됨.
    // 주로 애니메이션 효과를 초기화하거나, 이벤트 리스너를 없애는 역할을 함
    // 이 함수가 호출되고 난 다음에 reunder 함수가 호출되며, v16.3 이후 deprecate 됨
    // 기존의 기능은 getSnapshotBeforeUpdate()로 대체됨
    // componentWillUpdate(nextProps, nextState) {

    // }

    render() {
        console.log("child render");
        return (
            <React.Fragment>
            <div>{this.props.name}</div>
            <div>10945</div>
            <div>1020</div>
            </React.Fragment>
        );
    }
}

ReactDom.render(<Index name="jongjin"/>, document.getElementById('root'));