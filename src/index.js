import React from 'react';
import ReactDom from 'react-dom';
import Bug from './Bug';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter : 0,
            currentTime: (new Date()).toLocaleString(),
            error: false,
        }
        this.launchClock();
    }
    // 랜더되기 전 호출되는 함수인데 v16.3에서 deprecated되었고 용도는 서버사이드 호출 용도로 사용됐었음
    componentWillMount() {
        console.log("componentWillMount 실행");
        // render 아직 하지 않아 dom에 아직 추가가 되지 않은 상황에서 해당 함수를 호출하면 null
        console.log("ReactDom.findDOMNode(this)", ReactDom.findDOMNode(this));
        console.log("componentWillMount 끝");
    }

    // 랜더 후 호출되며 D3, Masonry, AJAX와 같은거 할때 사용하는 위치이며 componentWillMount에서 햇던 역할도 수행가능
    // 이때, 컴포넌트의 엘리먼트가 실제 DOM에 반영되어 자식 엘리먼트를 포함한 모든 엘리먼트에 접근 할 수 있기 때문
    componentDidMount() {
        console.log("componentDidMount 실행");
        console.log("ReactDom.findDOMNode(this)", ReactDom.findDOMNode(this));
        console.log("componentDidMount 끝");
    }

    // 새로운 props를 받게 됐을 떄 호출 되며 주로, stat가 props에 따라 변해야하는 로직을 작성함
    // nextProps는 새로 받게 될 props이고 this.props를 조회하면 업데이트 되기 전 속성 값이므로 참고하세요.
    componentWillReceiveProps(nextProps) {
        console.log("parent componentWillReceiveProps");
    }

    // 이 기능은 상황에 따라 componentWillReceiveProps를 대체함
    // 특정 props가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하며
    // 사용법은 setState를 하는 것이 아니라 아래와 같이하면 됨
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("child getDerivedStateFromProps");
    //     console.log("child getDerivedStateFromProps nextProps", nextProps);
    //     console.log("child getDerivedStateFromProps prevState", prevState);
    //     if (nextProps.name !== prevState.name) {
    //         console.log("return name=", nextProps.name);
    //         return { name : nextProps.name };
    //     }
    //     // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    //     console.log("return null");
    //     return null;
    // }

    // 컴포넌트 최적화에 유용함 리액트에서 변화가 발생한 부분만 감지해내기 위해서는 Virtual DOM에 한번 그려야함
    // 즉, 현재 컴포넌트의 상태가 없데이트되지 않아도, 부모컴포넌트가 리렌더링되면, 자식들도 리렌더링됨
    // 여기서 리렌더링이란 render함수를 뜻함. 물론 renduer함수가 호출된다고해서 반드시; DOM 조작하는 것은 아님
    // 그냥 Virutal DOM에만 렌더링 할뿐이다. 이 작업이 그렇게 많은 부하가 있는 건 아니지만
    // 컴포넌트가 무수히 많아 렌더링 된다면 이건 또다른 얘기임(CUP 자원을 사용함) 따라서 Virutal DOM에 리렌더링 하는것도
    // 불필요할 경우 아래 함수를 사용하여 Virutal DOM에 리렌더링 안시키는 것도 중요함
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate 실행");
        console.log("nextProps", nextProps);
        console.log("nextState", nextState);
        // 기본 적으로 true 반환 -> render 함수 호출
        // false를 반환 -> redner 함수 비호출
        // JSON.stringify() 를 쓰면 여러 field 를 편하게 비교 할 수 있음
        if (Number(nextProps.counter) === nextState.counter) {
            console.log("nextProps === nextState");
            return false;
        }
        console.log("nextProps !== nextState");
        return true;
    }

    // shouldComponentUpdate가 true를 반환했을 때만 호출됨.
    // 주로 애니메이션 효과를 초기화하거나, 이벤트 리스너를 없애는 역할을 함
    // 이 함수가 호출되고 난 다음에 render 함수가 호출되며, v16.3 이후 deprecate 됨
    // 기존의 기능은 getSnapshotBeforeUpdate()로 대체됨
    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate 실행");
        console.log("nextProps", nextProps);
        console.log("nextState", nextState);
        console.log("componentWillUpdate 끝");
    }

    // DOM 업데이트가 일어나기 직전의 시점임
    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //
    // }

    // 이 API는 컴포넌트에서 render() 를 호출하고난 다음에 발생
    // 이 시점에선 this.props 와 this.state 가 바뀌어있음.
    // 그리고 파라미터를 통해 이전의 값인 prevProps 와 prevState 를 조회 가능
    // 세번째 인자는 getSnapshotBeforeUpdate에서 반환한 snapshot 값
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate 실행");
    }

    // 컴포넌트 제거는 오직 하나
    componentWillUnmount() {
        // 이벤트제거,
        // setTimeout한 것이 있으면 clearTimeout
        // 외부 라이브러리 사용하는게 있음 해당 라이브러리 dispose 기능을 여기서 쓰면 됨
    }

    launchClock() {
        setInterval(() => {
            this.setState({
                counter: ++this.state.counter,
                currentTime  : (new Date()).toLocaleString()
            })
        }, 5000)
    }

    render() {
        if (this.state.error) return (<h1>에러발생!</h1>);
        console.log("render 실행");
        return (
            <React.Fragment>
                <h1>hello</h1>
            </React.Fragment>
        )
    }

    // 컴포넌트 자신의 render 함수에서 에러가 발생해버리는것은 잡아낼 수는 없지만,
    // 그 대신에 컴포넌트의 자식 컴포넌트 내부에서 발생하는 에러들을 잡아낼 수 있음
    // componentDidCatch(error, info) {
    //     console.log("componentDidCatch 실행");
    //     console.log("componentDidCatch error", error);
    //     console.log("componentDidCatch info", info);
    //     this.setState({
    //         error: true
    //     });
    // }
}


ReactDom.render(<Content counter="4"/>, document.getElementById('root'));
// class Logger extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     // // 랜더되기 전 호출되는 함수인데 v16.3에서 deprecated되었고 용도는 서버사이드 호출 용도로 사용됐었음
//     // componentWillMount() {
//     //     console.log("componentWillMount 실행");
//     //     // render 아직 하지 않아 dom에 아직 추가가 되지 않은 상황에서 해당 함수를 호출하면 null
//     //     console.log("ReactDom.findDOMNode(this)", ReactDom.findDOMNode(this));
//     // }

//     // // 컴포넌트 최적화에 유용함 리액트에서 변화가 발생한 부분만 감지해내기 위해서는 Virtual DOM에 한번 그려야함
//     // // 즉, 현재 컴포넌트의 상태가 없데이트되지 않아도, 부모컴포넌트가 리렌더링되면, 자식들도 리렌더링됨
//     // // 여기서 리렌더링이란 render함수를 뜻함. 물론 renduer함수가 호출된다고해서 반드시; DOM 조작하는 것은 아님
//     // // 그냥 Virutal DOM에만 렌더링 할뿐이다. 이 작업이 그렇게 많은 부하가 있는 건 아니지만
//     // // 컴포넌트가 무수히 많아 렌더링 된다면 이건 또다른 얘기임(CUP 자원을 사용함) 따라서 Virutal DOM에 리렌더링 하는것도
//     // // 불필요할 경우 아래 함수를 사용하여 Virutal DOM에 리렌더링 안시키는 것도 중요함
//     // shouldComponentUpdate(nextProps, nextState) {
//     //     console.log("shouldComponentUpdate 실행");
//     //     // 기본 적으로 true 반환 -> render 함수 호출
//     //     // false를 반환 -> redner 함수 비호출
//     //     if (nextProps.counter === nextState.counter) {
//     //         return false;
//     //     }
//     //     return true;
//     // }

//     // // 랜더 후 호출되며 D3, Masonry, AJAX와 같은거 할때 사용하는 위치이며 componentWillMount에서 햇던 역할도 수행가능
//     // // 이때, 컴포넌트의 엘리먼트가 실제 DOM에 반영되어 자식 엘리먼트를 포함한 모든 엘리먼트에 접근 할 수 있기 때문
//     // componentDidMount() {
//     //     console.log("componentDidMount 실행");
//     //     console.log("ReactDom.findDOMNode(this)", ReactDom.findDOMNode(this));
//     // }

// }