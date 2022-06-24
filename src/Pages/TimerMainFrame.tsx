import React from 'react';

function TimerMainFrame() {
    return (
        <div className="TimerMainFrame">
            <h3>Time in seconds:</h3>
            <h1 data-testid="TimeInSeconds" className="TimeInSeconds">0.00</h1>
        </div>
    )
}

export default TimerMainFrame;