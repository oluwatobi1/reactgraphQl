import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import { ButtonGroup } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { useState } from 'react';
import { FormControlLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyle = makeStyles({
  root:{
    background: 'linear-gradient(45deg, #fff, #999)',
    border:0,
    borderRadius: 15,
    color: 'white',
    padding: '0, 30px'
  }
})

function ButtonStyled(){
  const classes = useStyle()
  return (
    <Button className={classes.root}>A styled button</Button>
  )
}

function CheckBoxExample(){
  const [checked, setchecked] = useState(false)
  return (
    <FormControlLabel
      control = {
        <Checkbox
        checked={checked}
        onChange={(e)=>setchecked(e.target.checked)}
        icon = {<SaveIcon/>}
        checkedIcon={<SaveIcon/>}
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
        <ButtonStyled/>
        <TextField
          variant="outlined"
          color="secondary"
          type="name"
          label="Your First Name"
        />
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
