import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: this.props.timer,
      timerIsOn: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { timer, timerIsOn } = this.state;

    if (prevState.timer !== 0 && timer === 0) {
      this.resetTimer();
    }

    if (prevState.timerIsOn === false && timerIsOn === true) {
      this.timer = setInterval(
        () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
        1000
      );
    }
  }

  componentWillUnmount() {
    this.resetTimer();
  }

  startTimer = () => {
    const { timer } = this.state;

    if (timer !== 0) {
      this.setState({ timer, timerIsOn: true });
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerIsOn: false });
  };

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({ timer: 0, timerIsOn: false });
  };

  addNumberZero = (n) => (n < 10 ? `0${n}` : n);

  render() {
    const { timer } = this.state;
    const minutes = this.addNumberZero(Math.floor(timer / 60));
    const seconds = this.addNumberZero(timer - minutes * 60);

    return (
      <>
        <button className="icon icon-play" onClick={this.startTimer}></button>
        <button className="icon icon-pause" onClick={this.stopTimer}></button>
        <span className="description__timer">{`${minutes}:${seconds}`}</span>
      </>
    );
  }
}
