import { React, useState, useEffect, useRef } from 'react';

function Timer(props) {
  const [timer, setTimer] = useState(props.timer);
  const [timerOn, setTimerOn] = useState(false);
  let timerId = useRef(null);

  useEffect(() => {
    if (timer === 0) {
      resetTimer();
    }
  }, [timer]);

  useEffect(() => {
    if (timerOn === true) {
      timerId.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
  }, [timerOn]);

  const startTimer = () => {
    setTimer(timer);
    setTimerOn(true);
  };
  const stopTimer = () => {
    clearInterval(timerId.current);
    setTimerOn(false);
  };
  const resetTimer = () => {
    clearInterval(timerId.current);
    setTimer(0);
    setTimerOn(false);
  };
  const addNumberZero = (n) => {
    return n < 10 ? '0' + n : n;
  };

  const min = addNumberZero(Math.floor(timer / 60));
  const sec = addNumberZero(timer - min * 60);
  return (
    <>
      <button className="icon icon-play" onClick={startTimer}></button>
      <button className="icon icon-pause" onClick={stopTimer}></button>
      <span className="description__timer">
        {min}:{sec}
      </span>
    </>
  );
}

export default Timer;
