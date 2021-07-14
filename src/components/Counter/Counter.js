import React from "react";
import "./Counter.css";

function Counter(props) {
  return (
    <div className="counter-container">
      <h3 id={props.labelId}>{props.counterLabel}</h3>
      <div className="control-panel">
        {!props.timerIsRunning && (
          <button
            id={props.decrementBtnId}
            onClick={() => props.decreaseCounter()}
            aria-label="decrease button"
          >
            <i className="fas fa-chevron-down"></i>
          </button>
        )}
        <p
          id={props.counterId}
          className={
            props.timerIsRunning ? "bigger-when-is-running" : "normal-counter"
          }
        >
          {props.counter}
        </p>
        {!props.timerIsRunning && (
          <button
            id={props.incrementBtnId}
            onClick={() => props.increaseCounter()}
            aria-label="increase button"
          >
            <i className="fas fa-chevron-up"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Counter;
