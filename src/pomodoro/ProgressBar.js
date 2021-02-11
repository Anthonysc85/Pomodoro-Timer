import React from 'react';
import { secondsToDuration, minutesToDuration } from '../utils/duration';

function ProgressBar(props) {
  const { durationMinutes, durationSeconds, durationProgress, onBreak,
    activeSession, initialBreakTimer, initialFocusTimer } = props;

  const handleDisplay = activeSession ? { display: 'block' } : { display: 'none' };
  const handleSessionDuration = !onBreak ? minutesToDuration(initialFocusTimer) : minutesToDuration(initialBreakTimer);
  const handleSessionTitle = !onBreak ? "Focusing" : "On Break";

  return (
    <div style={handleDisplay}>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {handleSessionTitle} for {handleSessionDuration} minutes
              </h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration((durationMinutes * 60) + durationSeconds)} remaining
            </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={durationProgress}
              style={{ width: `${durationProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;
