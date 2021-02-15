import React, { useContext, useEffect, useState }  from "react"
import styled from "styled-components"
import { Context } from "../components/context"
import states from "../components/states"

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0; right: 0;
  height: 60px;
  background-color: #FFF;
  border-bottom: 1px solid whitesmoke;
  z-index: 10;
`

const Content = styled.div`
  margin: 0 auto;
  padding: 20px; 
  height: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Brand = styled.div`

`

const Links = styled.div`
  display: flex;
  flex-direction: row;
`

const Link = styled.a`
  color: #000;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #bf00ff;
  }
  margin-left: 20px;
`

const Navbar = ({}) => {
  const {globalContext,setGlobalContext} = useContext(Context)

  function setUrl(e,url) {
    e.preventDefault()
    setGlobalContext(prev => ({...prev, url: url}))
  }

  return (
    <Bar>
      <Content>
        <Brand>
          Brand
        </Brand>
        <Links>
          <Link href="/predict" onClick={e => setUrl(e,"/form")}>Form</Link>
          <Link href="/result" onClick={e => setUrl(e,"/result")}>Result</Link>
          <Link href="/history" onClick={e => setUrl(e,"/history")}>History</Link>
          <Link href="/analysis" onClick={e => setUrl(e,"/analysis")}>Analysis</Link>
          <Link href="/about" onClick={e => setUrl(e,"/about")}>About</Link>
        </Links>
      </Content>
    </Bar>
  )
}

export default Navbar