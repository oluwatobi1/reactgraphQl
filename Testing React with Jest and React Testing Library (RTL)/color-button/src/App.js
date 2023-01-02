import './App.css';
import {useState} from "react";

function App() {
    const [toggleButton, setToggleButton] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false);
    const handleClick = ()=>{
        setToggleButton(prevState => !prevState)
    }
    return (
        <div className="App">
            <button disabled={isDisabled} style={{backgroundColor: toggleButton? "red":"blue"}} onClick={handleClick}>
                {toggleButton? "Change to Blue": "Change to Red" }
            </button>
            <input type="checkbox" id="disableColorBtn" defaultChecked={isDisabled} onChange={(e)=>setIsDisabled(e.target.checked)}/>
            <label htmlFor="disableColorBtn">Disable Button</label>

        </div>
    );
}

export default App;
