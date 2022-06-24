import React from 'react';

function TimerMainFrame(props: {time: number}) {
    return (
        <div className="TimerMainFrame">
            <h3>Time in seconds:</h3>
            <h1 data-testid="TimeInSeconds" className="TimeInSeconds">{ props.time.toFixed(2) }</h1>
        </div>
    )
}

export default TimerMainFrame;