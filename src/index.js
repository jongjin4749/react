import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Clock extends React.Component{
    constructor(props) {
        // 자식생성자에서 부모 생성자를 호출해야 부모 클래스의 생성자가 실행됨
        // 호출하지 않으면 부모 클래스(React.component)의 기능을 사용 못함
        super(props);
        this.launchClock();
        this.state = {
            currentTime : new Date().toLocaleString()
        }
    }

    // 만약 contrucotr 메서드를 따로 작성하지 않으면 super()를 호출한 것으로 가정함
    // state = {
    //     currentTime : new Date().toLocaleString(),
    // }


    launchClock() {
        // 자바스크립트에서 this는 함수가 호출된 곳에 따라 다름
        // this가 컴포넌트 클래스를 참조하여 setState를 사용하기 위해서는 적절한 컨텍스트에 함수를 바인딩해야함
        // 만약 화살표함수를 아래와 같이 사용하면 자동으로 바인딩된 함수를 생성할 수 있다.
        setInterval(() => {
            console.log("Updateing time");
            // setState함수는 비동기이며 인자에는 아래와 같이 2가지 경우가 있다
            // 전달하는 상태는 상태 객체의 일부분만 갱신함(일부만 수정하거나 병합하고 완벽하게 교체안함)
            // https://www.vobour.com/-setstate-%EB%A9%94%EC%8F%98%EB%93%9C-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0%EB%A1%9C-%EA%B0%9D%EC%B2%B4-%EB%8C%80%EC%8B%A0-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-using

            // 1. Object data
            // 동적으로 시간이 계속 바뀜
            this.setState(
                {currentTime : new Date().toLocaleString()}
            )

            // 2. callback function -> 새로운 상태에 의존하는 경우 콜백함수를 사용해야 새로운 상태가 적용된 후에 필요한 작업수행가능
            // 시간이 이전상태에 계속 머무르는것을 볼 수 있음
            // this.setState((prevState, props)=>{
            //     {currentTime : new Date().toLocaleString()}
            // })
        }, 1000)
    }

    render() {
        return <div>{this.state.currentTime}</div>
    }
}
export default Clock;

ReactDOM.render(
    <Clock/>, document.getElementById('root')
)