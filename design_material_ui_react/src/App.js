import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import { ButtonGroup } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { useState } from 'react';
import { FormControlLabel } from '@material-ui/core';


function CheckBoxExample(){
  const [checked, setchecked] = useState(false)
  return (
    <FormControlLabel
      control = {
        <Checkbox
        checked={checked}
        onChange={(e)=>setchecked(e.target.checked)}
        inputProps={{
          "aria-label": 'secondary checkbox'
        }}
      />
      }
      label="Testing CheckBox"    
    />
      
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CheckBoxExample>
        </CheckBoxExample>
        <ButtonGroup>

          <Button
            startIcon={<SaveIcon />}
            size='large'
            variant="contained"
            color="primary">
            Save
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            size='large'
            variant="contained"
            color="secondary">
            Delete
          </Button>
        </ButtonGroup>
        <img src={logo} className="App-logo" alt="logo" />

      </header>
    </div>
  );
}

export default App;
