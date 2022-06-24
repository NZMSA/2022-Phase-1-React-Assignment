import React, {useState} from 'react';

function NameSetting(props: {submitName: (a: string) => void}) {
    const [value, setValue] = useState('');

    function handleChange(event) {
        setValue(event.target.value.slice(0, 32));        
    }
    
    return (
        <div className="NameSetting">
            <textarea data-testid="NameEntry" 
                className="NameEntry" 
                placeholder="Insert a name you want to use!"
                onChange={handleChange}
                value={value}
            />
            <button data-testid="SetNameButton" 
                className="SetNameButton" 
                onClick={() => props.submitName(value)}
            >
                Set Name
            </button>
        </div>
    )
}

export default NameSetting;