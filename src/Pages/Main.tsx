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
  const [initialTime, setInitialTime] = useState(Date.now());
  let int = setInterval(updateTime, 10);
  clearInterval(int);

  function updateTime() {
    if (timerRunning) {
      let dt: number = Date.now() - initialTime;
      setTimerCount(timerCount + dt/1000);
    }
  }

  function clickStart() {
    if (timerRunning) {
      clearInterval(int);
    } else {
      setInitialTime(Date.now())
      int = setInterval(updateTime, 10)
    }
    setTimerRunning(!timerRunning);
  }

  function clickReset() {
    setTimerCount(0);
  }

  return (
    <div className="MainPage">
      <WelcomeSection />
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