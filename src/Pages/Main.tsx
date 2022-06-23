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
  const [nameValue, setNameValue] = useState<string>("");
  const [nameDone, setNameDone] = useState<string>("User");
  const [seconds, setSeconds] = useState(0.00);
  const [isActive, setIsActive] = useState(false);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    nameValue.length > 0 ? setNameDone(nameValue) : null;
    setNameValue('')
  };

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0.00);
    setIsActive(false);
  }

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {setSeconds(seconds + 0.01)}, 10)
    }
  })

  // useEffect(() => {
  //   let interval: number;
  //   if (isActive) {
  //     interval = window.setInterval(() => {
  //       setSeconds(seconds => seconds + 0.01);
  //     }, 10);
  //   } 
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  return (
    <div className="MainPage">
      <div className="WelcomeSection">
        <h1>Stopwatch Application.</h1>
        <div className="NameSetting">
          <textarea data-testid="NameEntry" className="NameEntry" placeholder="Insert a name you want to use!"
            value={nameValue}
            maxLength={32}
            onChange={(
                ev: React.ChangeEvent<HTMLTextAreaElement>,
            ): void => setNameValue(ev.target.value)}
          />
          <button data-testid="SetNameButton" className="SetNameButton" onClick={buttonHandler}>Set Name</button>
        </div>
        <h2 data-testid="WelcomeBanner" className="WelcomeBanner">Welcome {nameDone}!</h2>
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