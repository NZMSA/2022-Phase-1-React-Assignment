import React, {useState} from 'react';
import NameSetting from './NameSetting.js';

function WelcomeSection() {
    const [ name, setName ] = useState('User');

    function submitName(name: string) {
        setName(name);
    }

    return (
        <div className="WelcomeSection">
            <h1>Stopwatch Application.</h1>
            <NameSetting/>
            <h2 data-testid="WelcomeBanner" className="WelcomeBanner">Welcome {name}!</h2>
      </div>
    )
}

export default WelcomeSection;