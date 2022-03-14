import './Calculator.css';
import './Util.js'
import NavBar from './NavBar.js'
import { withStyles } from '@mui/styles';
import React, { useState, useEffect } from "react";
import { AiOutlineCopyright } from 'react-icons/ai'
import { RiDivideFill } from 'react-icons/ri'
import { FaEquals } from 'react-icons/fa'
import {Container, Button, Grid} from '@mui/material'
import { Divider, Fab, TextField, ThemeProvider} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import styled from '@mui/styled-engine';
import { createTheme } from '@mui/material/styles'

import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';


function Calculator() {
  const [display_value, setDisplayValue] = useState("")
  const [current_expression, setCurrentExpression] = useState("")
  const [waiting_for_operand, setWaitingForOperand] = useState(true)
  const [has_decimal, setHasDecimal] = useState(false)
  const [has_result, setHasResult] = useState(false)


  const handleSymbolPress = (ev) => {
    console.log(ev.currentTarget.value)
    if(ev.currentTarget.value === "clear"){
      setDisplayValue("")
      setCurrentExpression("")
      setWaitingForOperand(true)
      setHasDecimal(false)
    }
    else if(ev.currentTarget.value === '.' && !has_decimal){
      if(display_value === ""){
        setDisplayValue("0.")
      } else {
        setDisplayValue(display_value + ev.currentTarget.value)
      }
      setHasDecimal(true)
      setWaitingForOperand(false)
    }
    else if(ev.currentTarget.value === '=' && (display_value !== "")){
      try{
        const result = eval(current_expression)
        setDisplayValue('' + result)

        setCurrentExpression('' + result)
        setWaitingForOperand(false)
        setHasResult(true)
      }catch (error) {
        console.error(error)
      }
    }
    else if(!waiting_for_operand){
      setWaitingForOperand(true)
      setCurrentExpression(current_expression + ev.currentTarget.value)
    }
    console.log(current_expression)
  }

  const handleNumpadPress = (ev) => {
    if(!waiting_for_operand && (display_value !== "")){
      setDisplayValue(display_value + ev.currentTarget.value)
      if(has_result){
        setCurrentExpression("" + ev.currentTarget.value)
        setHasResult(false)
      }
      else{
        setCurrentExpression(current_expression + ev.currentTarget.value)
      }
    }
    else if(waiting_for_operand){
      setDisplayValue(ev.currentTarget.value)
      setCurrentExpression(current_expression + ev.currentTarget.value)
      setWaitingForOperand(false)
    }
  }


  const FunctionFab = styled(Fab)`
    background: #fad652;
    
  `

  const NumberButton = styled(Button)`
    border-radius: 100px;
    width: 50%;
    border: 2px solid;
  `
  const TransparentFab = styled(Fab)`
    background: transparent;
    padding: 0px;
  `
  const KeypadGrid = styled(Grid)`
    height: 20%;
    right: 0px;
    bottom: 0px;
  `

  const theme = createTheme({
    shadows: ["none"],
    palette: {
      primary: {
        main: '#FFFFFF'
      }
    },
  });

  const StyledTextField = withStyles((theme) => ({
    root: {
      "& .MuiInputBase-root": {
        color: theme.palette.primary.main,
        textAlign: "right"
      }
    }
  }))(TextField);

  var numpad = [7,8,9,4,5,6,1,2,3,0].map((n) => {
    if(n === 0){
      return (
              <Grid item xs={8} sm={8} lg={8} xl={8} >
                <Button variant="outlined" color="primary" style={{ borderRadius: "100px", width: "100%", border: "2px solid" }} onClick={handleNumpadPress} value={n}>
                  <span className="number">{n}</span>
                </Button>
              </Grid>
      )
    }
    return (<Grid item xs={4} lg={4} xl={4} style={{ height: "100%" }}>
              <NumberButton variant="outlined" color="primary" style={{ width: "100%"}} onClick={handleNumpadPress} value={n}>
                <span className="number" >{n}</span>
              </NumberButton>
            </Grid>)
  })
  
  return (
    <div className = "calculator">      
      <ThemeProvider theme={theme}>
      <Container justify="center" sx={{height: "100vh", width: "100vw",position: "absolute", bottom:"0px",right:"0px"}} maxWidth="false" disableGutters={true}>

        <NavBar />

        <div className="calculator-display">
            <StyledTextField fullWidth value={display_value} inputProps={{ min: 0, style: { textAlign: 'right',fontSize: "500%" } }} variant="standard" margin="dense" sx={{color: "white",bottom: "0px", position: "absolute", right: "0px" }}/>
        </div>

        <Divider />
        
        <div className="calculator-keypad">
          
            <KeypadGrid spacing={1} container sx={{ background: "#43326e" }} style={{ textAlign: "center"}}>

              <Grid item="true" xs={3} lg={3} xl={3} >
                <TransparentFab onClick={handleSymbolPress} className="clear_screen" value="clear">
                  <AiOutlineCopyright size="100px" color="#fad652"/>
                </TransparentFab>
              </Grid>

              <Grid item xs={3} lg={3} xl={3} className="empty_space"></Grid>

              <Grid item xs={3} lg={3} xl={3}>
                <FunctionFab onClick={handleSymbolPress} className="multiply" value='*'>
                  <CloseRoundedIcon color="#43326e"/>
                </FunctionFab>
              </Grid>
              
              
              <Grid item xs={3} lg={3} xl={3}>
                <FunctionFab onClick={handleSymbolPress} className="divide" value='/'>
                  <RiDivideFill color="#43326e" size="50%" />
                </FunctionFab>
              </Grid>

              <Grid item xs={9} lg={9} xl={9} className="numpad" style={{ height: "100%" }}>
                <Grid container spacing={1.5}>
                  {numpad}
                  <Grid item xs={4} lg={4} xl={4}>
                    <NumberButton variant="outlined" color="primary" onClick={handleSymbolPress} style={{width:"100%"}} value='.'>
                      <span className="number" >.</span>
                    </NumberButton>
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid item xs={3} lg={3} xl={3} style={{ height: "100%" }}>
                <Grid container spacing={.5}>
                  <Grid item xs={12} lg={12} xl={12}>
                    <FunctionFab onClick={handleSymbolPress} className="subtract" value='-'>
                      <RemoveIcon color="#43326e" size="50%" />
                    </FunctionFab>
                  </Grid>

                  <Grid item xs={12} lg={12} xl={12}>
                    <FunctionFab onClick={handleSymbolPress} className="add" value='+'>
                      <AddIcon color="#43326e" size="50%" />
                    </FunctionFab>

                  </Grid>
                  <Grid item xs={12} lg={12} xl={12}>
                      <FunctionFab onClick={handleSymbolPress} variant="extended" sx={{height: "15vh"}} className="equals" value='='>
                        <FaEquals />
                      </FunctionFab>
                  </Grid>

                </Grid>
              </Grid>           

            </KeypadGrid>

        </div>
      </Container>
      </ThemeProvider>

    </div>
  );
}

export default Calculator;
