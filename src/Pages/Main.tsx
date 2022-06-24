import React from 'react';
import './Main.css';
import WelcomeSection from './WelcomeSection.js';
import TimerMainFrame from './TimerMainFrame.js';
import TimerButtons from './TimerButtons.js';

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

  return (
    <div className="MainPage">
      <WelcomeSection />
      <TimerMainFrame />
      <TimerButtons />
    </div>
  );
}

export default Main;