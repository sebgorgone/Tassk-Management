import { useState, useEffect } from 'react'
import './assets/index.css'
import { pallette } from './assets/DefaultPallettes'

function Shell() {

  localStorage.clear()

  //state
  let local;
  const [data, setData] = useState(localStorage.getItem('data'))
  console.log('DATA VALUE: ', data)




  //style

  let c = pallette[2];

  console.log(c)

  const header = {
    fontFamily: "fontss",
    fontSize: "2em",
    background: c.dark
  }

  const body = {
    fontFamily: "fontss"
  }

  //use effect

  useEffect (() => {
    if (data === null) {
      local = localStorage.getItem('data');
      if (typeof local === 'string') {
        setData(JSON.parse(local))
      }
    }
    console.log('local: ', local)
    if (!local && !data) {
      console.log('useeffct 1')
      import('./DefaultUser').then((data) => {
        const defaults = JSON.stringify(data);
        localStorage.setItem('data', JSON.stringify(data));
        setData(JSON.stringify(data));
        console.log('effect log: ', JSON.stringify(data));
      })
    }
    if (typeof local === 'string') {
      console.log('typeof === string')
    }
    if (typeof local === 'string' && data == null) {
      setData(JSON.parse(local))
    }
  },[])

 


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
