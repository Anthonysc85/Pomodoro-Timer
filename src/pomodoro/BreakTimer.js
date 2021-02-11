import React from "react";
import { minutesToDuration } from "../utils/duration";

function BreakTimer({ breakTimer, decreaseBreakTimer, increaseBreakTimer }) {
	return (
		<div className="col">
			<div className="float-right">
				<div className="input-group input-group-lg mb-2">
					<span className="input-group-text" data-testid="duration-break">
						Break Duration: {minutesToDuration(breakTimer)}
					</span>
					<div className="input-group-append">
						<button
							type="button"
							className="btn btn-secondary"
							data-testid="decrease-break"
							onClick={decreaseBreakTimer}
						>
							<span className="oi oi-minus" />
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-testid="increase-break"
							onClick={increaseBreakTimer}
						>
							<span className="oi oi-plus" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BreakTimer;
