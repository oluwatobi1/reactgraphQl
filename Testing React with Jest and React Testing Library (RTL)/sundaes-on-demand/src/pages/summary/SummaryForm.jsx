import React, {useState} from 'react';

function SummaryForm(props) {
    const [canSubmit, setCanSubmit] = useState(false);
    return (
        <div>
            <input type="checkbox" id="t_and_c" defaultChecked={canSubmit} onChange={(e)=>{
                setCanSubmit(e.target.checked);
            }}/>
            <label htmlFor="t_and_c" >
                Terms and Conditions
            </label>

            <button disabled={canSubmit}> Submit</button>
        </div>
    );
}

export default SummaryForm;