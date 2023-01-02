import './App.css';
import {useState} from "react";
export const replaceCamelCaseWithSpaces = (colorName) => {

}

function App() {
    const [toggleButtonColor, setToggleButtonColor] = useState("blue")
    const btnColor = toggleButtonColor==="red"?"blue":"red"
    const [isDisabled, setIsDisabled] = useState(false);
    const handleClick = ()=>{
        setToggleButtonColor(btnColor)
    }
    return (
        <div className="App">
            <button disabled={isDisabled} style={{backgroundColor: isDisabled ? "gray":btnColor}} onClick={handleClick}>
                {btnColor==="red"? "Change to Blue": "Change to Red" }
            </button>
            <input type="checkbox" id="disableColorBtn" defaultChecked={isDisabled} onChange={(e)=>setIsDisabled(e.target.checked)}/>
            <label htmlFor="disableColorBtn">Disable Button</label>

        </div>
    );
}

export default App;
