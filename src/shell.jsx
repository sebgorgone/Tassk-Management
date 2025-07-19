import { useState } from 'react'
import './assets/index.css'
import { pallette } from './assets/DefaultPallettes'

function Shell() {

  //state
  const [count, setCount] = useState(0)

  let c = pallette[2];

  console.log(c)

  //style

  const header = {
    fontFamily: "fontss",
    fontSize: "2em",
    background: c.dark
  }

  const body = {
    fontFamily: "fontss"
  }


  return (
    <>
      <div className="headerBar" style={header}>hello</div>
      <div className="headerBar" style={{background: c.bright}}></div>
      <div className="headerBar" style={{background: c.light}}></div>
      <div className="headerBar" style={{background: c.altLight}}></div>
      <div className="headerBar" style={{background: c.vibr}}></div>

    </>
  )
}

export default Shell
