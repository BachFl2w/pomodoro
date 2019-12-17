import React, { Component } from 'react';
import './pomodoro.scss';

const defaultValue = {
  minutes: 24,
  breakTime: 4,
  seconds: 59,
  type: 1, // 1: play time, 0: break time
  play: false
};

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = defaultValue;
  }

  handleRestart = () => {
    clearInterval(this.interval);
    this.setState(defaultValue);
  }

  restartInterval = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.handleCountDown, 1000);
  }

  handleStart = () => {
    const { minutes, breakTime, seconds, play } = this.state;

    if (minutes < 0 || seconds < 0 || breakTime < 0) return;

    if (play === true) {
      this.setState({ play: false });
      this.handleRestart();
    } else {
      this.restartInterval();
      this.setState({ play: true });
    }
  }

  handleCountDown = () => {
    const { minutes, seconds, type, breakTime } = this.state;
    const newSeconds = seconds - 1 < 0 ? 59 : seconds - 1;
    let newMinutes = type ? minutes : breakTime;

    if (seconds - 1 < 0) {
      newMinutes--;

      if (newMinutes < 0) {
        newMinutes = type ? defaultValue.breakTime : defaultValue.minutes;
      }
    }

    if (newMinutes >= 0 && newSeconds >= 0) {
      this.setState({
        minutes: newMinutes,
        seconds: newSeconds,
        type: 1
      });
    } else if (type === 1) {
      this.setState({
        minutes: newMinutes,
        type: 0
      });
    } else {
      this.setState(defaultValue);
    }
  }

  render() {
    const { minutes, seconds, play } = this.state;

    return (
      <div className="container">
        <div className="intro">
          Hi, This is&nbsp;
          <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" rel="noopener noreferrer" target="_blank">Pomodoro</a>&nbsp;
          App, just touch white circle !
        </div>
        <div className={`time ${play ? 'play' : 'stop'}`} onClick={this.handleStart}>
          <span className="minutes">{minutes}</span> : <span className="seconds">{seconds}</span>
        </div>
        <div className="footer">
          <a
            href="https://www.facebook.com/bachnguyen29071998"
            rel="noopener"
            target="_blank noreferrer"
          >
            Created by Flynn
          </a>
        </div>
      </div>
    )
  }
}
