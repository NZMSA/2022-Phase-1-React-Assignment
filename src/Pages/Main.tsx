import React, {useEffect, useState} from 'react';
import './Main.css';

function Main() {
  document.title = "Stopwatch"

  // States
  const [user, setUser] = useState<string>("User");
  const [time, setTime] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timer>(setInterval(()=>{}));
  const [lastSavedTime, setLastSavedTime] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  const updateUserName = () => {
    const str = (document.getElementById("NameEntry") as HTMLInputElement).value;
    if (!(/^\s*$/.test(str))) {
      setUser(str);
      (document.getElementById("NameEntry") as HTMLInputElement).value = ""
    }
  }

  const startTimer = () => {
    timerStarted ? document.getElementById("ResetButton")?.removeAttribute("Disabled") : document.getElementById("ResetButton")?.setAttribute("Disabled", "true");
    const _timerStarted = !timerStarted;
    
    if (_timerStarted) {
      const initTime = Date.now();
      setTime(time);
      setTimer(
        setInterval(() => {
          setTime(lastSavedTime + ((Date.now() - initTime)/1000));
        }, 10)
      );
    } else {
        clearInterval(timer);
        setLastSavedTime(time);
    }

    setTimerStarted(!timerStarted)
  }

  return (
    <div className="MainPage">
      <div className="WelcomeSection">
        <h1>Stopwatch Application.</h1>
        <div className="NameSetting">
          <textarea data-testid="NameEntry" id="NameEntry" className="NameEntry" placeholder="Insert a name you want to use!" maxLength={32}/>
          <button data-testid="SetNameButton" className="SetNameButton" onClick={updateUserName}>Set Name</button>
        </div>
        <h2 data-testid="WelcomeBanner" className="WelcomeBanner">Welcome {user}!</h2>
      </div>
      <div className="TimerMainFrame">
        <h3>Time in seconds:</h3>
        <h1 data-testid="TimeInSeconds" className="TimeInSeconds">{time.toFixed(2)}</h1>
      </div>
      <div className="TimerButtons">
        <button data-testid="StartButton" className="StartButton" id="StartButton" onClick={startTimer}>{timerStarted ? "Pause" : "Start"}</button>
        <button data-testid="ResetButton" className="ResetButton" id="ResetButton" onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Main;