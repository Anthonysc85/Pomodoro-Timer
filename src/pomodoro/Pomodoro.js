import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import FocusTimer from "./FocusTimer";
import BreakTimer from "./BreakTimer";
import PlayPause from "./PlayPause";
import ProgressBar from "./ProgressBar";

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [activeSession, setActiveSession] = useState(false);

  const [focusTimer, setFocusTimer] = useState(25);
  const [breakTimer, setBreakTimer] = useState(5);
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [initialBreakTimer, setInitialBreakTimer] = useState(5);
  const [initialFocusTimer, setInitialFocusTimer] = useState(25);

  const [durationProgress, setDurationProgress] = useState(0);

  const increaseFocusTimer = () => setFocusTimer((currentTime) => currentTime !== 60 ? currentTime + 5 : currentTime);
  const decreaseFocusTimer = () => setFocusTimer((currentTime) => currentTime !== 5 ? currentTime - 5 : currentTime);
  const increaseBreakTimer = () => setBreakTimer((currentTime) => currentTime !== 15 ? currentTime + 1 : currentTime);
  const decreaseBreakTimer = () => setBreakTimer((currentTime) => currentTime !== 1 ? currentTime - 1 : currentTime);



  const percentage = (currentMinutes, currentSeconds, initialMinutes) => {
    return 100 - (((currentMinutes * 60) + currentSeconds) / (initialMinutes * 60) * 100);
  }

  useInterval(
    () => {
      setDurationSeconds(second => {
        second === 0 ? second = 59 : second -= 1;
        if (second === 59) setDurationMinutes(minutes => minutes -= 1);
        return second;
      })

      if (onBreak) setDurationProgress(currentProgress => currentProgress = percentage(durationMinutes, durationSeconds, initialBreakTimer));
      else setDurationProgress(currentProgress => currentProgress = percentage(durationMinutes, durationSeconds, initialFocusTimer));

      if (durationMinutes === 0 && durationSeconds === 1) timerExpired();
    },
    isTimerRunning ? 1000 : null
  );

  const timerExpired = () => !onBreak ? focusTimerExpired() : breakTimerExpired();

  const breakTimerExpired = () => {
    new Audio('https://bigsoundbank.com/UPLOAD/mp3/0899.mp3').play();
    setOnBreak(state => state = false);
    setDurationProgress(progress => progress = 0);
    setDurationSeconds(second => second = 0);
    setDurationMinutes(minutes => minutes = initialFocusTimer);
  }

  const focusTimerExpired = () => {
    new Audio('https://bigsoundbank.com/UPLOAD/mp3/1482.mp3').play();
    setOnBreak(state => state = true);
    setDurationProgress(duration => duration = 0);
    setDurationSeconds(second => second = 0);
    setDurationMinutes(minute => minute = breakTimer);
  }

  const playPause = () => {
    if (firstPlay) {
      setInitialFocusTimer(duration => duration = focusTimer);
      setInitialBreakTimer(duration => duration = breakTimer);
      setDurationMinutes(duration => duration = focusTimer);
      setFirstPlay(first => first = false);
    }
    setActiveSession(session => session = true);
    setIsTimerRunning((prevState) => !prevState);
  }

  const stopBtn = () => {
    setFirstPlay(state => state = false);
    setIsTimerRunning(timer => timer = false);
    setOnBreak(state => state = false);
    setActiveSession(session => session = false);

    setDurationProgress(progress => progress = 0);
    setDurationSeconds(second => second = 0);
    setDurationMinutes(minute => minute = focusTimer);
    setInitialFocusTimer(duration => duration = focusTimer);
    setInitialBreakTimer(duration => duration = breakTimer);
  }


  return (
    <div className="pomodoro">
      <div className="row">
        <FocusTimer focusTimer={focusTimer} increaseFocusTimer={increaseFocusTimer} decreaseFocusTimer={decreaseFocusTimer} />
        <BreakTimer breakTimer={breakTimer} increaseBreakTimer={increaseBreakTimer} decreaseBreakTimer={decreaseBreakTimer} />
      </div>
      <PlayPause playPause={playPause} classNames={classNames} isTimerRunning={isTimerRunning} stopBtn={stopBtn} />
      <ProgressBar durationMinutes={durationMinutes} durationSeconds={durationSeconds} durationProgress={durationProgress} 
      onBreak={onBreak} activeSession={activeSession} initialBreakTimer={initialBreakTimer} 
      initialFocusTimer={initialFocusTimer} />
    </div>
  );
}

export default Pomodoro;
