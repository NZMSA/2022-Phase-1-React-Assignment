import React,{useState, useEffect} from 'react';
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
  const [nameValue, setNameValue] = useState<string>("User");
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [start, setStart] = useState(Date.now());
  const [count, setCount] = useState(0);

  const buttonHandler = () => {
    const name = document.getElementById("NameEntry") as HTMLInputElement;
    if (name.value.length > 0) {
      setNameValue(name.value);
      name.value = "";
    }
  };

  function toggle() {
    setIsActive(!isActive);
    if (!isActive) {
      setStart(Date.now())
    } else {
      setCount(seconds)
    }
  }

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {setSeconds((count + ((Date.now() - start))/1000))}, 10)
    }
  })

  function reset() {
    setSeconds(0);
    setCount(0);
    setIsActive(false);
  }

  return (
    <div className="MainPage">
      <div className="WelcomeSection">
        <h1>Stopwatch Application.</h1>
        <div className="NameSetting">
          <textarea data-testid="NameEntry" id="NameEntry" className="NameEntry" 
            placeholder="Insert a name you want to use!"
            maxLength={32}
          />
          <button data-testid="SetNameButton" className="SetNameButton" onClick={buttonHandler}>Set Name</button>
        </div>
        <h2 data-testid="WelcomeBanner" className="WelcomeBanner">Welcome {nameValue}!</h2>
      </div>
      <div className="TimerMainFrame">
        <h3>Time in seconds:</h3>
        <h1 data-testid="TimeInSeconds" className="TimeInSeconds">{seconds.toFixed(2)}</h1>
      </div>
      <div className="TimerButtons">
        <button data-testid="StartButton" className="StartButton" onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
        {isActive ? 
          <button disabled data-testid="ResetButton" className="ResetButton" onClick={reset}>Reset</button> 
          : 
          <button data-testid="ResetButton" className="ResetButton" onClick={reset}>Reset</button>
        }
      </div>
    </div>
  );
}

export default Main;