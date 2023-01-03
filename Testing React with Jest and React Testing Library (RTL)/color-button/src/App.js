import './App.css';
import {useState} from "react";
export const replaceCamelCaseWithSpaces = (colorName) => {
    return colorName.replace(/\B([A-Z])\B/g, " $1")

}

function App() {
    const [toggleButtonColor, setToggleButtonColor] = useState("MidnightBlue")
    const btnColor = toggleButtonColor==="MidnightVioletRed"?"MidnightBlue":"MidnightVioletRed"
    const [isDisabled, setIsDisabled] = useState(false);
    const handleClick = ()=>{
        setToggleButtonColor(btnColor)
    }
    return (
        <div className="App">
            <button disabled={isDisabled} style={{backgroundColor: isDisabled ? "gray":btnColor}} onClick={handleClick}>
                {btnColor==="MidnightVioletRed"? "Change to Midnight Blue": "Change to Midnight Violet Red" }
            </button>
            <input type="checkbox" id="disableColorBtn" defaultChecked={isDisabled} onChange={(e)=>setIsDisabled(e.target.checked)}/>
            <label htmlFor="disableColorBtn">Disable Button</label>

        </div>
    );
}

export default App;
