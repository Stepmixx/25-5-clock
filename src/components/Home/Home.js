import React, { useState, useRef } from "react";
import "./Home.css";
import Counter from "../Counter";
import Timer from "../Timer";

function Home() {
  const [sessionLengthCounter, setSessionLengthCounter] = useState(25);
  const [breakLengthCounter, setBreakLengthCounter] = useState(5);
  const [sessionCounter, setSessionCounter] = useState(1);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const timerRef = useRef();

  const increaseSessionLengthCounter = () => {
    if (sessionLengthCounter < 60) {
      setSessionLengthCounter(sessionLengthCounter + 1);
      setTimeout(() => timerRef.current.restartTimer(), 5);
    }
  };

  const decreaseSessionLengthCounter = () => {
    if (sessionLengthCounter > 1) {
      setSessionLengthCounter(sessionLengthCounter - 1);
      setTimeout(() => timerRef.current.restartTimer(), 5);
    }
  };

  const increaseBreakLengthCounter = () => {
    if (breakLengthCounter < 60) {
      setBreakLengthCounter(breakLengthCounter + 1);
      setTimeout(() => timerRef.current.restartTimer(), 5);
    }
  };

  const decreaseBreakLengthCounter = () => {
    if (breakLengthCounter > 1) {
      setBreakLengthCounter(breakLengthCounter - 1);
      setTimeout(() => timerRef.current.restartTimer(), 5);
    }
  };
  const increaseSessionCounter = () => setSessionCounter(sessionCounter + 1);

  const decreaseSessionCounter = () =>
    sessionCounter > 1 ? setSessionCounter(sessionCounter - 1) : null;

  return (
    <div id="home-container">
      <h1>Habit Clock</h1>
      <div id="clock-container">
        <Counter
          labelId="session-label"
          counterId="session-length"
          counterLabel="Session Length"
          counter={sessionLengthCounter}
          increaseCounter={increaseSessionLengthCounter}
          decreaseCounter={decreaseSessionLengthCounter}
          incrementBtnId="session-increment"
          decrementBtnId="session-decrement"
          timerIsRunning={timerIsRunning}
        />
        <Counter
          labelId="break-label"
          counterId="break-length"
          counterLabel="Break Length"
          counter={breakLengthCounter}
          increaseCounter={increaseBreakLengthCounter}
          decreaseCounter={decreaseBreakLengthCounter}
          incrementBtnId="break-increment"
          decrementBtnId="break-decrement"
          timerIsRunning={timerIsRunning}
        />
        <Counter
          labelId="sessions-label"
          counter={sessionCounter}
          counterId="sessions"
          counterLabel="Sessions"
          increaseCounter={increaseSessionCounter}
          decreaseCounter={decreaseSessionCounter}
          incrementBtnId="sessions-increment"
          decrementBtnId="sessions-decrement"
          timerIsRunning={timerIsRunning}
        />

        <Timer
          sessionTime={sessionLengthCounter}
          breakTime={breakLengthCounter}
          sessions={sessionCounter}
          passRunning={setTimerIsRunning}
          setSessionLength={setSessionLengthCounter}
          setBreakLength={setBreakLengthCounter}
          ref={timerRef}
        />
        <p id="my-name">by Stephan</p>
      </div>
    </div>
  );
}

export default Home;
