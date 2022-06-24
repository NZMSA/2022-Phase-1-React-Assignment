import React, {useState} from 'react';

function TimerButtons(props: {clickStart: (a: void) => void, clickReset: (a: void) => void, timerRunning: boolean}) {
    return (
        <div className="TimerButtons">
            <button 
                data-testid="StartButton" 
                className="StartButton" 
                onClick={ () => props.clickStart() }
            >
                {props.timerRunning ? 'Pause': 'Start'}
            </button>
            <button 
                data-testid="ResetButton" 
                className="ResetButton" 
                disabled={ props.timerRunning } 
                onClick={ () => props.clickReset() }
            >
                Reset
            </button>
        </div>
    )
}
 
export default TimerButtons;