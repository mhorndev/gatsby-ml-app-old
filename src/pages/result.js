import React, { useContext, useEffect }  from "react"
import styled from "styled-components"
import { Context } from "../components/context"
import Navbar from "../components/navbar"

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
  flex-direction: column;
`

const Heading = styled.h1`

`

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  margin-left: 10px;
  margin-right: 10px;
`

const Result = ({}) => {
  const {globalContext,setGlobalContext} = useContext(Context)

  function setUrl(e,url) {
    e.preventDefault()
    setGlobalContext(prev => ({...prev, url: url}))
  }

  function formatCost(value) {
    return "$" + value.toFixed(2)
  }

  return (
    <Page>
      <Content>
        {globalContext.cost ? ( 
          <>
            <Heading>Result</Heading>
            <p><strong>Cost:{" "}</strong>{formatCost(globalContext.cost)}</p>
            <Buttons>
              <Button className="btn btn-primary" onClick={e => setUrl(e,"/form")}>Run it back</Button>
              <Button className="btn btn-dark" onClick={e => setUrl(e,"/analysis")}>See Analysis</Button>
            </Buttons>
          </>
        ) : (
          <>
            <Heading>Whoops</Heading>
            <p>No result found.</p>
            <p>Try creating a query on the form page.</p>
            <button className="btn btn-primary" onClick={e => setUrl(e,"/form")}>Let's go</button>
          </>
        )}

      </Content>
    </Page>
  )
}

export default Result