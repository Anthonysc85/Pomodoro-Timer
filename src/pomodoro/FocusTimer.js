import React from 'react';
import { minutesToDuration } from '../utils/duration';

function FocusTimer({ focusTimer, increaseFocusTimer, decreaseFocusTimer }) {
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          Focus Duration: {minutesToDuration(focusTimer)}
        </span>
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={decreaseFocusTimer}
          >
            <span className="oi oi-minus" />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={increaseFocusTimer}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;
