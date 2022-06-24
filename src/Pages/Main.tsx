import React, {useState} from 'react';
import './Main.css';
import WelcomeSection from './WelcomeSection';
import TimerMainFrame from './TimerMainFrame';
import TimerButtons from './TimerButtons';

function Main() {
  /*
    TODO: Implement the functionality in the following components:
    - NameEntry textarea.
    - Set Name button.
    - TimeInSeconds update.
    - Start button.
    - Pause button.
    - Reset button.
  */

  document.title = "Stopwatch"

  const [timerRunning, setTimerRunning] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [pauseCount, setPauseCount] = useState(0);
  const [initialTime, setInitialTime] = useState(Date.now())

  function clickStart() {
    if (timerCount == 0) {
      setInitialTime(Date.now())
    }
    setTimerRunning(!timerRunning);
  }

  function clickReset() {
    setTimerCount(0);
    setPauseCount(0);
  }

  if (timerRunning) {
    setTimeout(() => {
      let totalElapsed = (Date.now() - initialTime) / 1000;
      setTimerCount(totalElapsed - pauseCount);
    });
  }
  if (!timerRunning && timerCount > 0) {
    setTimeout(() => {
      let totalElapsed = (Date.now() - initialTime) / 1000;
      setPauseCount(totalElapsed - timerCount);
    });
  }

  return (
    <div className="MainPage">
      <WelcomeSection/>
      <TimerMainFrame time={timerCount}/>
      <TimerButtons 
        clickStart={clickStart} 
        clickReset={clickReset} 
        timerRunning={timerRunning} 
      />
    </div>
  );
}

export default Main;