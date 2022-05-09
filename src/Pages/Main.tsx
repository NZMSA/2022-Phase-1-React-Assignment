import React, { useEffect, useState } from 'react';
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
  const [user, setUser] = useState("User");

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
        <h1 data-testid="TimeInSeconds" className="TimeInSeconds">0.00</h1>
      </div>
      <div className="TimerButtons">
        <button data-testid="StartButton" className="StartButton">Start</button>
        <button data-testid="ResetButton" className="ResetButton">Reset</button>
      </div>
    </div>
  );
}

export default Main;