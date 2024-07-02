import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timeRunning: false,
    timer: 25,
    timeInSecs: 25 * 60,
  }

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.timeId)
  }

  timerfn = () => {
    const {timeInSecs, timeRunning} = this.state
    if (timeRunning) {
      this.setState(prevState => ({
        timeInSecs: prevState.timeInSecs - 1,
      }))
      console.log(timeInSecs)
    } else {
      clearInterval(this.timeId)
    }
  }

  playTimer = () => {
    this.clearTimerInterval()
    this.setState(prevState => {
      const {timeRunning} = prevState

      return {timeRunning: !timeRunning}
    })

    this.timeId = setInterval(this.timerfn, 1000)
  }

  clickReset = () => {
    this.clearTimerInterval()
    this.setState({
      timer: 25,
      timeInSecs: 25 * 60,
      timeRunning: false,
    })
  }

  render() {
    const {timeRunning, timer, timeInSecs} = this.state
    const minutes = parseInt(timeInSecs / 60, 10)
    const seconds = parseInt(timeInSecs % 60, 10)
    const increaseTimer = () => {
      if (!timeRunning) {
        this.setState(prevState => ({
          timer: prevState.timer + 1,
          timeInSecs: prevState.timeInSecs + 60,
        }))
      }
    }

    const decreaseTimer = () => {
      if (!timeRunning) {
        this.setState(prevState => ({
          timer: prevState.timer - 1,
          timeInSecs: prevState.timeInSecs - 60,
        }))
      }
    }

    return (
      <div className="clockBg">
        <h1>Digital Timer</h1>
        <div className="clockBgSub">
          <div className="clockBgSub2">
            <div className="clockTimer">
              <h1 className="timer">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
              <p className="Runnning">{timeRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div className="clockBgSub1">
            <div className="clock2BgSub">
              <button
                onClick={this.playTimer}
                type="button"
                className="playBtn"
              >
                <img
                  alt={timeRunning ? 'pause icon' : 'play icon'}
                  src={
                    !timeRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                  }
                />
                <p>{!timeRunning ? 'Start' : 'Pause'}</p>
              </button>
              <button
                onClick={this.clickReset}
                type="button"
                className="playBtn"
              >
                <img
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <p>reset</p>
              </button>
            </div>
            <p className="seter">Set Timer Limit</p>
            <div className="timerSetBox">
              <button onClick={decreaseTimer} type="button" className="addBtn">
                -
              </button>
              <p className="setTime">{timer}</p>
              <button onClick={increaseTimer} type="button" className="addBtn">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
