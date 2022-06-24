import { render } from '@testing-library/react';
import React from 'react';

function NameSetting() {
    return (
        <div className="NameSetting">
            <textarea data-testid="NameEntry" 
                className="NameEntry" 
                placeholder="Insert a name you want to use!"
            />
            <button data-testid="SetNameButton" 
                className="SetNameButton" 
            >
                Set Name
            </button>
        </div>
    )
}

export default NameSetting;