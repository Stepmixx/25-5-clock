import React, { useState, forwardRef, useImperativeHandle } from "react";
import alarmSrc from "./audio/alarm.mp3";
import { useTimer } from "react-timer-hook";
import "./Timer.css";

function Timer(props, ref) {
  const [sessionCounter, setSessionCounter] = useState(1);
  const [titleLabel, setTitleLabel] = useState("Session");
  const numToMins = (num) => {
    const time = new Date();
    time.setSeconds(60 * num + time.getSeconds());
    return time;
  };

  const alarmSound = document.getElementById("beep");

  const onFinish = () => {
    if (props.sessions === sessionCounter && titleLabel === "Break") {
      alarmSound.play();
      props.passRunning(!isRunning);
    } else if (titleLabel === "Break") {
      alarmSound.play();
      setTitleLabel("Session");
      setSessionCounter(sessionCounter + 1);
      setTimeout(() => restart(numToMins(props.sessionTime)), 1000);
    } else if (titleLabel === "Session") {
      alarmSound.play();
      setTitleLabel("Break");
      setTimeout(() => restart(numToMins(props.breakTime)), 1000);
    }
  };

  const { seconds, minutes, hours, isRunning, resume, pause, restart } =
    useTimer({
      expiryTimestamp: numToMins(props.sessionTime),
      onExpire: () => onFinish(),
      autoStart: false,
    });

  const startPause = () => {
    if (isRunning) {
      pause();
      props.passRunning(!isRunning);
    } else {
      resume();
      props.passRunning(!isRunning);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      restartTimer() {
        restart(numToMins(props.sessionTime), false);
        setSessionCounter(1);
        setTitleLabel("Session");
      },
    }),
    [restart, props.sessionTime]
  );

  const restartTimer = () => {
    restart(numToMins(props.sessionTime), false);
    setSessionCounter(1);
    setTitleLabel("Session");
    props.setSessionLength(25);
    props.setBreakLength(5);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  const formatTimer = (timeNum) =>
    timeNum < 10 ? "0" + timeNum.toString() : timeNum;

  return (
    <div id="timer-container">
      <audio id="beep" src={alarmSrc}></audio>
      <h2 id="timer-label">{titleLabel + " " + sessionCounter}</h2>
      <div
        id="time-left"
        className={minutes === 0 && hours === 0 ? "is-finishing" : "is-running"}
      >
        {hours === 1 ? "60" : formatTimer(minutes)}:{formatTimer(seconds)}
      </div>
      <div id="control-panel">
        <button
          id="start_stop"
          onClick={startPause}
          aria-label="play-pause button"
        >
          {isRunning ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>
        <button id="reset" onClick={restartTimer} aria-label="restart button">
          <i className="fas fa-undo"></i>
        </button>
      </div>
    </div>
  );
}

export default forwardRef(Timer);
