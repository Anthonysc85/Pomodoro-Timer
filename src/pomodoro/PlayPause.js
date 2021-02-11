import React from 'react';

function PlayPause({ playPause, classNames, isTimerRunning, stopBtn }) {
	return (
		<div className="row">
			<div className="col">
				<div
					className="btn-group btn-group-lg mb-2"
					role="group"
					aria-label="Timer controls"
				>
					<button
						type="button"
						className="btn btn-primary"
						data-testid="play-pause"
						title="Start or pause timer"
						onClick={playPause}
					>
						<span
							className={classNames({
								oi: true,
								"oi-media-play": !isTimerRunning,
								"oi-media-pause": isTimerRunning,
							})}
						/>
					</button>
					<button
						type="button"
						className="btn btn-secondary"
						title="Stop the session"
						onClick={stopBtn}
					>
						<span className="oi oi-media-stop" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default PlayPause;
