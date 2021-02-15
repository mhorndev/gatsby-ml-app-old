import React, { useContext, useEffect }  from "react"
import styled from "styled-components"
import { Context } from "../components/context"

const Page = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  overflow: hidden;
`

const Content = styled.div`
  margin: 0 auto;
  padding: 20px; 
  height: 100%;
  max-width: 1000px;
  display: flex;
  place-content: center;
  place-items: center;
`

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  place-content: center;
  place-items: center;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Heading = styled.h1`
  width: 100%;
  margin-top: 1em;
`

const Index = ({}) => {
  const {globalContext,setGlobalContext} = useContext(Context)

  function setUrl(e,url) {
    e.preventDefault()
    setGlobalContext(prev => ({...prev, url: url}))
  }

  return (
    <Page>
      <Content>
        <Paper>
          <h2>HELLO</h2>
          <p>The machine learning model will return an estimated risk cost based on input parameters.</p>
          <Buttons>
            <button className="btn btn-primary" onClick={e => setUrl(e,"/form")}>
              Let's get started
            </button>
          </Buttons>
        </Paper>
      </Content>
    </Page>
  )
}

export default Index