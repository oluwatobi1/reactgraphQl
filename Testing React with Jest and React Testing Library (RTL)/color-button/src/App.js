import './App.css';
import {useState} from "react";

function App() {
    const [toggleButton, setToggleButton] = useState(true)
    const handleClick = ()=>{
        setToggleButton(prevState => !prevState)
    }
    return (
        <div className="App">
            <button style={{backgroundColor: toggleButton? "red":"blue"}} onClick={handleClick}>
                {toggleButton? "Change to Blue": "Change to Red" }
            </button>

        </div>
    );
}

export default App;
