import React, {useState, ChangeEvent, SyntheticEvent} from 'react';

function NameSetting(props: {submitName: (a: string) => void}) {
    const [value, setValue] = useState('');

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value.slice(0, 32));        
    }
    function handleSubmit() {
        if (value !== '') {
            props.submitName(value);
        }
        setValue('');
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
                onClick={handleSubmit}
            >
                Set Name
            </button>
        </div>
    )
}

export default NameSetting;