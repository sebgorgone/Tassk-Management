import { useState, useEffect } from 'react'
import './assets/index.css'
import { pallette } from './assets/DefaultPallettes'

function Shell() {
  //state
  const [data, setData] = useState(null)
  console.log('DATA VALUE: ', data)




  //style

  let c = pallette[2];

  console.log(c)

  const header = {
    fontFamily: "fontss",
    background: c.dark
  }

  const body = {
    fontFamily: "fontss",
    color: c.altLight
  }

  const assO = {
    color: c.vibr
  }

  const assB ={
    color: c.bright
  }

  const button = {
    color: c.vibr
  }

  const buttonTilte = {
    color: c.bright,
    fontSize: "2em",
    margin: "0",
    marginLeft: '.25em'
  }

  //use effect

  useEffect(() => {
  const stored = localStorage.getItem('data');

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      setData(parsed);
      console.log('Loaded from localStorage:', parsed);
      return; // exit early if we have valid local data
    } catch (e) {
      console.error('Bad JSON in localStorage:', e);
      localStorage.removeItem('data'); // clear corrupted data
    }
  }

  // No valid local data? Load defaults
  import('./DefaultUser').then((module) => {
    const defaultData = module.default || module;
    localStorage.setItem('data', JSON.stringify(defaultData));
    setData(defaultData);
    console.log('Loaded default data:', defaultData);
  });
}, []);

 


  return (
    <>
      <div style={{position: 'fixed',top: '0', left: '0', minWidth: "100vw", minHeight: "100vh", zIndex: "-1", background: c.altLight}}></div>
      <img src='./vectorGraphics/assStencil.svg' style={{position: 'fixed',marginLeft: "10%", marginTop: "10em", width: "80%"}}/>
      <div className="headerBar" style={header}>
        <img src='./vectorGraphics/ass.svg' className='headerIcon'/>
        <div style={{display: "flex", flexFlow: "column", alignItems: 'center', justifyContent: "center"}} className='headerButtonDiv'>
          <p style={buttonTilte}>New Task Group</p>
          <button style={button} className='headerButton' >＋</button>
        </div>
        <p style={body} className='headerTitle'>T<span style={assB}>a</span><span style={assO}>ss</span>k Management</p>
      </div>
      <p>
        {`name: ${data && data.data.name}`} <br />
        {`created at: ${data &&  data.data.crtdAT}`} <br />
        {`pallette: ${data && data.data.pall}`} <br />
        {`tags: ${data && data.data.tags}`} <br />
        {`TGs: ${data && data.data.tGs.map(tg => tg.taskGroupName + '__ DESCRIPTION: ' + tg.desc + '__CREATED_AT: ' + tg.createdAt + '__TAGS: ' + tg.tags + '__ __ __TASKS: ' + tg.tasks.map(t => '______TASK_NAME: ' + t.taskName + '__CREATED_AT: ' + t.createdAt + '__TASK: ' + t.task + '__'))}`} <br />
      </p>
      {/* <div className="headerBar" style={{background: c.bright}}></div>
      <div className="headerBar" style={{background: c.light}}></div>
      <div className="headerBar" style={{background: c.altLight}}></div>
      <div className="headerBar" style={{background: c.vibr}}></div> */}

    </>
  )
}

export default Shell
