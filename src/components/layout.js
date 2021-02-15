import React, { useEffect, useState } from "react"
import { Context } from "./context"
import { navigate } from "gatsby"
import Transition from "./transition"
import "../css/style.css"
import Navbar from "../components/navbar"

const routes = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Form",
    path: "/form"
  },
  {
    name: "Result",
    path: "/result"
  },
  {
    name: "History",
    path: "/history"
  },
  {
    name: "Analysis",
    path: "/analysis"
  },
  {
    name: "About",
    path: "/about"
  },
]

const Layout = ({children, location}) => {
  const [globalContext,setGlobalContext] = useState({})
  
  useEffect(() => {
    if (globalContext.url === location.pathname) {
      return
    }

    let next = routes.findIndex(obj => obj.path === globalContext.url)
    let curr = routes.findIndex(obj => obj.path === location.pathname)
    let dirr = next > curr ? 1 : -1
    setGlobalContext(prev => ({...prev, direction: dirr}))

    console.log(curr + " -> " + next + " (" + dirr + ")")

    navigate(globalContext.url)

  }, [globalContext.url])

  return (
    <Context.Provider value={{globalContext,setGlobalContext}}>
      <Navbar/>
      <Transition>
        {children}
      </Transition>
    </Context.Provider>
  )
}

export default Layout