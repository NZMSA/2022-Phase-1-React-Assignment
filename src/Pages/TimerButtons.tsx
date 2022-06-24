import React from 'react';

function TimerButtons() {
    return (
        <div className="TimerButtons">
            <button data-testid="StartButton" className="StartButton">Start</button>
            <button data-testid="ResetButton" className="ResetButton">Reset</button>
        </div>
    )
}

export default TimerButtons;