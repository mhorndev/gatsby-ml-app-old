import React, { useContext, useEffect, useState }  from "react"
import styled from "styled-components"
import { Context } from "../components/context"
import states from "../components/states"
import Navbar from "../components/navbar"

const Page = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  overflow-y: auto;
`

const Content = styled.div`
  margin: 60px auto;
  padding: 20px; 
  max-width: 1000px;
`

const Footer = styled.div`
  height: 60px;
`

const Heading = styled.h1`
  width: 100%;

`
const Param = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Label = styled.div`
  flex: 1;
`

const Value = styled.div`
  flex: 1;
`

const Control = styled.div`
  flex: 4;
`

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`

const Predict = ({}) => {
  const {globalContext,setGlobalContext} = useContext(Context)

  const initialParams = {
    age: undefined,
    sex: undefined,
    height: undefined,
    weight: undefined,
    children: undefined,
    smoker: undefined,
    state: undefined,
  }

  const [params,setParams] = useState(initialParams)
  const [validated,setValidated] = useState(false)

  function resetForm() {
    setParams(initialParams)
  }

  function submitForm() {
    const url = 'https://api-ahrjj7evdq-uc.a.run.app/'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify({
        age:params.age, 
        sex:params.sex, 
        bmi:getBmi(), 
        children:params.children,
        smoker:params.smoker,
        region:getRegion(),
      })
    }

    fetch(url, options)
    .then(response => {
      response = response.json()
      response.then(function(response) {
        setGlobalContext(prev => ({...prev, cost: response.cost, url: "/result"}))
      })
    })
  }

  function getBmi() {
    return(((params.weight/params.height/params.height) * 703).toFixed(2))
  }

  function getRegion() {
    return(states[params.state].region)
  }

  function randomizeForm() {
    setParams({...params, 
      sex: (Math.random() > 0.5) ? 1 : 0,
      smoker: (Math.random() > 0.5) ? 1 : 0,
      age: Math.floor(Math.random() * (100 - 18 + 1) + 18),
      height: Math.floor(Math.random() * (84 - 48) ) + 48,
      weight: Math.floor(Math.random() * (250 - 75) ) + 75,
      children: Math.floor(Math.random() * 4),
      state: Math.floor(Math.random() * 51)
    })
  }

  useEffect(() => {
    for (var p in params) {
      if (params[p] === undefined) {
        setValidated(false)
        return
      }
    }
    setValidated(true)
  },[params])

  function formatSex(value) {
    if (value === undefined) {
      return
    }
    const sex = {
      0: "M",
      1: "F"
    }
    return sex[value]
  }

  function formatSmoker(value) {
    if (value === undefined) {
      return
    }
    const smoker = {
      0: "N",
      1: "Y"
    }
    return smoker[value]
  }

  function formatHeight(value) {
    if (value === undefined) {
      return
    }
    var feet = Math.floor(value / 12);
    var inches = value - (feet * 12);
    return feet + '\'' + inches + '\"';
  }

  function formatWeight(value) {
    if (value === undefined) {
      return
    }
    return value + " lbs";
  }

  function formatState(value) {
    if (value === undefined) {
      return
    }
    return states[value].display
  }

  return (
    <Page>
      <Content>
        <Heading>Form</Heading>
        <p>To begin, enter parameters below</p>

        <hr/>

        <Param>
          <Label><strong>Sex:{" "}</strong>{formatSex(params.sex)}</Label>
          <Control>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{width:"100%", border:"0px"}}>
              <input type="radio" checked={params.sex === 0} className="btn-check" name="sexRadio" id="sexRadio1"
              onClick={e => setParams({...params, sex: 0})} readOnly/>
              <label className="btn btn-outline-primary" htmlFor="sexRadio1">Male</label>

              <input type="radio" checked={params.sex === 1} className="btn-check" name="sexRadio" id="sexRadio2"
              onClick={e => setParams({...params, sex: 1})} readOnly/>
              <label className="btn btn-outline-primary" htmlFor="sexRadio2">Female</label>
            </div>
          </Control>
        </Param>

        <hr/>

        <Param>
          <Label>            
            <strong>Smoker:{" "}</strong>
            {formatSmoker(params.smoker)}
          </Label>
          <Control>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" style={{width:"100%"}}>
              <input type="radio" checked={params.smoker === 0} className="btn-check" name="smokerRadio" id="smokerRadio1"
              onClick={e => setParams({...params, smoker: 0})} readOnly/>
              <label className="btn btn-outline-primary" htmlFor="smokerRadio1">No</label>

              <input type="radio" checked={params.smoker === 1} className="btn-check" name="smokerRadio" id="smokerRadio2"
              onClick={e => setParams({...params, smoker: 1})} readOnly/>
              <label className="btn btn-outline-primary" htmlFor="smokerRadio2">Yes</label>
            </div>
          </Control>
        </Param>

        <hr/>

        <Param>
          <Label>
            <strong>Age:{" "}</strong>
            {params.age}
          </Label>
          <Control>
            <input
            value={params.age || 0} 
            type="range" 
            min="18" 
            max="100"
            className="form-range"  
            onChange={e => setParams({...params, age: e.target.value})}
            onMouseDown={e => {if (params.age === undefined){setParams({...params, age: 18})}}}/>
          </Control>
        </Param>

        <hr/>

        <Param>
          <Label>
            <strong>Height:{" "}</strong>
            {formatHeight(params.height)}
          </Label>
          <Control>
            <input 
            value={params.height || 0} 
            type="range" 
            min="48" 
            max="84"
            className="form-range" 
            onChange={e => setParams({...params, height: e.target.value})}
            onMouseDown={e => {if (params.height === undefined){setParams({...params, height: 48})}}}/>
          </Control>
        </Param>

        <hr/>

        <Param>
        <Label>
            <strong>Weight:{" "}</strong>
            {formatWeight(params.weight)}
          </Label>
          <Control>
            <input 
            value={params.weight || 0} 
            type="range" 
            min="75" 
            max="350"
            className="form-range" 
            onChange={e => setParams({...params, weight: e.target.value})}
            onMouseDown={e => {if (params.weight === undefined){setParams({...params, weight: 75})}}}/>
          </Control>
        </Param>

        <hr/>

        <Param>
          <Label>
            <strong>Children:{" "}</strong>
            {params.children}
          </Label>
          
          <Control>
            <input type="range" className="form-range" min="0" max="7" 
              value={params.children || 0} 
              onChange={e => setParams({...params, children: e.target.value})}
              onMouseDown={e => {if (params.children === undefined){setParams({...params, children: 0})}}}/>
          </Control>

        </Param>

        <hr/>

        <Param>
          <Label>
            <strong>State:{" "}</strong>
            {formatState(params.state)}
          </Label>
          <Control>
            <input 
            value={params.state || 0} 
            type="range" 
            min="0" 
            max="50"
            className="form-range" 
            onChange={e => setParams({...params, state: e.target.value})}
            onMouseDown={e => {if (params.state === undefined) {setParams({...params, state: 0})}}}/>
          </Control>
        </Param>

        <hr/>

        <ButtonBar>
          <Buttons>
            <button className="btn btn-primary" onClick={submitForm} disabled={!validated}>Submit</button>
            <button className="btn btn-light" onClick={resetForm}>Reset</button>
          </Buttons>
          <button className="btn btn-dark" onClick={randomizeForm}>Randomize</button>
        </ButtonBar>


      </Content>

      <Footer/>
    </Page>
  )
}

export default Predict