import React, { useState } from 'react';
import './Main.css';

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

  // States
  const [user, setUser] = useState<string>("User");
  const [time, setTime] = useState<number>(0);
  const [savedTime, setSavedTime] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>(setInterval(()=>{}));

  function startPause() {
    const resetButton = document.getElementById("ResetButton") as HTMLButtonElement;
    const startTime = Date.now();
    const started = !active;
    if (started) {
      resetButton.disabled = true;
      setTimerInterval(() => setInterval(() => {setTime(savedTime + (Date.now() - startTime)/1000)}, 10));
    } else {
      resetButton.disabled = false;
      clearInterval(timerInterval);
      setSavedTime(time);
    }
    setActive(!active);
  }

  function reset() {
    setTime(0);
    setSavedTime(0);
  }

  function setName() {
    const name = document.getElementById("NameEntry") as HTMLInputElement;
    if (name.value.length > 0) {
      setUser(name.value);
      name.value = "";
    }
  }

  document.title = "Stopwatch"

  return (
    <div className="MainPage">
      <div className="WelcomeSection">
        <h1>Stopwatch Application.</h1>
        <div className="NameSetting">
          <textarea data-testid="NameEntry" id="NameEntry" className="NameEntry" placeholder="Insert a name you want to use!" maxLength={32} />
          <button data-testid="SetNameButton" className="SetNameButton" onClick={() => setName()}>Set Name</button>
        </div>
        <h2 data-testid="WelcomeBanner" className="WelcomeBanner">Welcome {user}!</h2>
      </div>
      <div className="TimerMainFrame">
        <h3>Time in seconds:</h3>
        <h1 data-testid="TimeInSeconds" className="TimeInSeconds">{time.toFixed(2)}</h1>
      </div>
      <div className="TimerButtons">
        <button data-testid="StartButton" className="StartButton" id="StartButton" onClick={() => startPause()}>{active ? "Pause" : "Start"}</button>
        <button data-testid="ResetButton" className="ResetButton" id="ResetButton" onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}

export default Main;