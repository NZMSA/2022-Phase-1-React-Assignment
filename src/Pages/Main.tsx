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

  document.title = "Stopwatch"

  // NameEntry State
  const [name, setName] = useState("User")

  // method to update the name
  const updateUserName = () => {
    const newUserName = (document.getElementById("NameEntry") as HTMLTextAreaElement).value
    // the length of the string must not be null and must be at least 1 character long
    if (newUserName.length > 0 && newUserName !== null) {
      setName(newUserName);
      (document.getElementById("NameEntry") as HTMLTextAreaElement).value = "";
    }
  }

  // timer state
  const initialTime = 0;
  const [time, setTime] = useState(initialTime)
  const [started, setStarted] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timer>(setInterval(() => { }));
  const [pausedTime, setPausedTime] = useState(0);

  const startTimer = () => {
    // if the timer started, pause and vice versa
    setStarted(!started)

    // if the timer started, the time should increase every 10ms.
    const initialTime = Date.now();
    if (!started) {
      setTimer(
        setInterval(() => {
          setTime(pausedTime + (Date.now() - initialTime) / 1000);
        }, 10)
      )
    } else {
      clearInterval(timer)
      setPausedTime(time)
    }
  }

  const resetTimer = () => {
    setTime(0);
  }

  return (
    <div className="MainPage">
      <div className="WelcomeSection">
        <h1>Stopwatch Application.</h1>
        <div className="NameSetting">
          <textarea data-testid="NameEntry" id="NameEntry" className="NameEntry" placeholder="Insert a name you want to use!" maxLength={32} />
          <button data-testid="SetNameButton" className="SetNameButton" onClick={updateUserName}>Set Name</button>
        </div>
        <h2 data-testid="WelcomeBanner" id="userName" className="WelcomeBanner">Welcome {name}!</h2>
      </div>
      <div className="TimerMainFrame">
        <h3>Time in seconds:</h3>
        <h1 data-testid="TimeInSeconds" className="TimeInSeconds">{time.toFixed(2)}</h1>
      </div>
      <div className="TimerButtons">
        <button data-testid="StartButton" className="StartButton" onClick={startTimer}>{started ? "Pause" : "Start"}</button>
        <button data-testid="ResetButton" className="ResetButton" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Main;