import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Clock extends React.Component {

    // state(클래스 필드)
    state = {
        money : 0,
        date : {
            year : 0,
            month : 0,
            day : 0,
        }

    }
    constructor(props) {
        console.log('constructor');
        super(props);
        // 클래스 필드가 먼저 실행되고 그 다음 생성자가 실행된다.
        this.state = {
            money : 1,
            date : {
                year : 1,
                month : 1,
                day : 1,
            }
        }
    }

    changePlusButton = () => {
        // 시간이 이전상태에 계속 머무르는것을 볼 수 있음
        this.setState((prevState, props)=>{
            return {
                money : prevState.money + 1,
                date : {
                    ...prevState.date,
                    year : prevState.date.year + 1
                }
            }
        })
    }

    changeMinusButton = () => {
        // 시간이 이전상태에 계속 머무르는것을 볼 수 있음
        this.setState((prevState, props)=>{
            return {
                money : prevState.money - 1,
                date : {
                    ...prevState.date,
                    year : prevState.date.year - 1
                }
            }
        })
    }

    changeObjectButton = () => {
        // setState 는 객체 안에 객체 그 이상 까지 확인 해주지 못한다.
        // date가 그냥 덮여버림
        // this.setState({
        //     date : {
        //         year : 1
        //     }
        // })
        // 아래와 같이 사용해야함(기존 date 객체 year를 제외한것들은 기존 값 유지하고 year만 바꾸기)
        this.setState({
            date : {
                ...this.state.date,
                year : 1
            }
        })
    }

    render() {
        console.log(this.state);
        return (
            <React.Fragment>
                <h4>{this.state.money}</h4>
                <button onClick={this.changePlusButton}>더하기</button>
                <button onClick={this.changeMinusButton}>뺴기</button>
                <button onClick={this.changeObjectButton}>오브젝트바꾸기</button>
                {/*아래와 같이 ()를 사용하게되면 해당 함수가 호출되어 무한 렌더링이 동작해버리니 주의*/}
                {/*<button onClick={this.changeObjectButton()}>주의하기</button>*/}
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Clock/>, document.getElementById('root'));