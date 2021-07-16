import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import alarmSrc from "./audio/alarm.mp3";
import accurateInterval from "accurate-interval";
import "./Timer.css";

function Timer(props, ref) {
  const sessionTimeSecs = props.sessionTime * 60;
  const breakTimeSecs = props.breakTime * 60;

  const [timeLeft, setTimeLeft] = useState(sessionTimeSecs);
  const [isRunning, setIsRunning] = useState(false);
  const [titleLabel, setTitleLabel] = useState("Session");
  const [intervalId, setIntervalId] = useState();

  useImperativeHandle(
    ref,
    () => ({
      restartTimer() {
        setTimeLeft(() =>
          titleLabel === "Session" ? sessionTimeSecs : breakTimeSecs
        );
        setTitleLabel(titleLabel);
      },
    }),
    [sessionTimeSecs, titleLabel, breakTimeSecs]
  );

  const switchTimer = () => {
    if (titleLabel === "Break") {
      setTitleLabel("Session");
      setTimeLeft(sessionTimeSecs);
    } else if (titleLabel === "Session") {
      setTitleLabel("Break");
      setTimeLeft(breakTimeSecs);
    }
  };

  const startTimer = () => {
    let id = accurateInterval(() => {
      if (timeLeft === 0) {
        switchTimer();
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    setIntervalId(id);
  };

  const startPause = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    props.passRunning(isRunning);
    if (isRunning) {
      if (timeLeft === 0) document.getElementById("beep").play();
      startTimer();
    } else {
      if (intervalId !== undefined) intervalId.clear();
    }
    return () => {
      if (intervalId !== undefined) intervalId.clear();
    };
  }, [timeLeft, isRunning]);

  const restartTimer = () => {
    setTitleLabel("Session");
    props.setSessionLength(25);
    props.setBreakLength(5);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  const formatTime = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  return (
    <div id="timer-container">
      <audio id="beep" src={alarmSrc}></audio>
      <h2 id="timer-label">{titleLabel}</h2>
      <div
        id="time-left"
        className={timeLeft < 60 ? "is-finishing" : "is-running"}
      >
        {formatTime()}
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
