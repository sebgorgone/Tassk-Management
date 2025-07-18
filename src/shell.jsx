import { useState } from 'react'
import './assets/index.css'
import { pallette } from './assets/DefaultPallettes'

function Shell() {

  //state
  const [count, setCount] = useState(0)

  let c = pallette[0];

  //style

  const header = {
    fontFamily: "fontss",
    fontSize: "1em",
  }

  const body = {
    fontFamily: "fontss"
  }


  return (
    <>
      <div className="headerBar" style={header}>hello</div>
    </>
  )
}

export default Shell
