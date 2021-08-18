import logo from './logo.svg';
import './App.css';
import { Button, createMuiTheme } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import { ButtonGroup } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { useState } from 'react';
import { FormControlLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';
import 'fontsource-roboto'
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu"


const useStyle = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #fff, #999)',
    border: 0,
    borderRadius: 15,
    marginBottom: 10,
    color: 'white',
    padding: '0, 30px'
  }
})

const theme = createTheme({
  typography: {
    h2: {
      fontSize: 34
    }
  },
  palette: {
    primary: {
      main: green[200]
    },
    secondary: {
      main: orange[200]
    }
  }
})

function ButtonStyled() {
  const classes = useStyle()
  return (
    <Button className={classes.root}>A styled button</Button>
  )
}

function CheckBoxExample() {
  const [checked, setchecked] = useState(false)
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => setchecked(e.target.checked)}
          icon={<SaveIcon />}
          checkedIcon={<SaveIcon />}
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
    <ThemeProvider theme={theme}>
      <Container maxWidth='md'>

        <div className="App">
          <header className="App-header">
            <AppBar>
              <Toolbar>
                <IconButton>
                  <MenuIcon/>
                </IconButton>
                <Typography>
                  This is the App Bar
                </Typography>
                <Button style={{background:'red'}}>
                  Login
                </Button>
              </Toolbar>
                
            </AppBar>
            <Typography
              variant="h2"
              component="div">
              Welcome to MUI
            </Typography>
            <Typography variant="subtitle1">
              An interesting design library
            </Typography>
            <ButtonStyled />
            <TextField
              variant="outlined"
              color="secondary"
              type="name"
              label="Your First Name"
            />
            <CheckBoxExample>
            </CheckBoxExample>
            <Grid container justifyContent="center">
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: 35, marginBottom: 12 }}>
                </Paper>
              </Grid>
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: 35, marginBottom: 12 }}>
                </Paper>
              </Grid>
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: 35, marginBottom: 12 }}>
                </Paper>
              </Grid>
            </Grid>


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
      </Container>

    </ThemeProvider>
  );
}

export default App;
