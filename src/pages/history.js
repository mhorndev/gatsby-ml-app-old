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

const History = ({}) => {
  const {globalContext,setGlobalContext} = useContext(Context)

  return (
    <Page>
      <Content>
        <Heading>History</Heading>
      </Content>
    </Page>
  )
}

export default History