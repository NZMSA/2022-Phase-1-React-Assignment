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

  function clickStart() {
    setTimerRunning(!timerRunning);
  }

  function clickReset() {
    setTimerCount(0);
  }

  if (timerRunning) {
    setTimeout(() => {
      setTimerCount(timerCount + 0.01);
    }, 10);
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