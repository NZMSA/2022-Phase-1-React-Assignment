import React, {useState, useRef, useEffect} from 'react';
import { start } from 'repl';
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

  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState("User");
  const [time, setTime] = useState(0.00);
  const [isRunning, setIsRunning] = useState(false)
  const [prevTime, setPrevTime] = useState(0)
  const [startTime, setStartTime] = useState(0)

  const submitName = () => {
    if(nameInput.length >= 1){
      setName(nameInput.slice(0,32));
      setNameInput("")
    }
  }

  const startWatch = () => {
    setStartTime(Date.now());
    setIsRunning(!isRunning)
  }

  const resetWatch = () => {
    setTime(0);
    setPrevTime(0);
  }

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime + ((Date.now() - startTime)/1000));
      }, 10);
    }
    setPrevTime(time);
    return () => {
      clearInterval(interval)
      setPrevTime(time);
    }
  }, [isRunning]);

  document.title = "Stopwatch"


  return (
    <div className="MainPage">
      <div className="WelcomeSection">
        <h1>Stopwatch Application.</h1>
        <div className="NameSetting">
          <textarea
            value={nameInput}
            data-testid="NameEntry" 
            className="NameEntry" 
            placeholder="Insert a name you want to use!"
            onChange={(e)=>{
              setNameInput(e.target.value)
            }}
            />
          <button onClick={submitName} data-testid="SetNameButton" className="SetNameButton">Set Name</button>
        </div>
        <h2 data-testid="WelcomeBanner" className="WelcomeBanner">Welcome {name}!</h2>
      </div>
      <div className="TimerMainFrame">
        <h3>Time in seconds:</h3>
        <h1 data-testid="TimeInSeconds" className="TimeInSeconds">{time.toFixed(2)}</h1>
      </div>
      <div className="TimerButtons">
        <button onClick={()=>{startWatch()}} data-testid="StartButton" className="StartButton">{isRunning ? "Pause" : "Start"}</button>
        <button disabled={isRunning ? true : false } onClick={()=>{resetWatch()}} data-testid="ResetButton" className="ResetButton">Reset</button>
      </div>
    </div>
  );
}

export default Main;