import { useState, useEffect } from 'react'
import './assets/index.css'
import { pallette } from './assets/DefaultPallettes'
import TaskGroup from './TaskGroup.jsx'
function Shell() {
  localStorage.clear()
  //state
  const [data, setData] = useState(null)
  console.log('DATA VALUE: ', data)




  //style

  let c = pallette[1]

  const debug = false;


  const header = {
    fontFamily: "fontss",
    background: c.altLight
  }

  const body = {
    fontFamily: "fontss",
    color: c.datk
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

  // task group lists

  const [TGs, setTGs] = useState('loading');

  console.log(TGs);

  //use effect

  useEffect(() => {
  const stored = localStorage.getItem('data');

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      setData(parsed);
      console.log('Loaded from localStorage:', parsed);
      return;
    } catch (e) {
      console.error('Bad JSON in localStorage:', e);
      localStorage.removeItem('data'); 
    }
  }

  import('./DefaultUser').then((module) => {
    const defaultData = module.default || module;
    localStorage.setItem('data', JSON.stringify(defaultData));
    setData(defaultData);
    console.log('Loaded default data:', defaultData);
  });
}, []);

useEffect(() => {
  if (data){ 
  const openTGs = data.data.TGs
  .filter(task => data.data.defaults.openTGs.includes(task.taskGroupName))
  .map(task => (
    <TaskGroup debug={debug} desc={task.desc} name={task.taskGroupName} tags={task.tags} createdAt={task.createdAt} tasks={task.tasks} key={task.taskGroupName} pallette={pallette[Math.floor(Math.random() * 2)]} icon={task.iconPath}/>
  ));
  setTGs(openTGs)
}
},[data])

  return (
    <>
      <div style={{position: 'fixed',top: '0', left: '0', minWidth: "100vw", minHeight: "100vh", zIndex: "-2", background: c.dark}}></div>
      <img src='./vectorGraphics/assStencil.svg' style={{position: 'fixed',marginLeft: "10%", marginTop: "10em", width: "80%", zIndex: "-1"}}/>
      <div className="headerBar" style={header}>
        <img src='./vectorGraphics/ass.svg' className='headerIcon'/>
        <div style={{display: "flex", flexFlow: "column", alignItems: 'center', justifyContent: "center"}} className='headerButtonDiv'>
          <p style={buttonTilte} className='task'>New Task Group</p>
          <button style={button}>＋</button>
        </div>
        <p style={body} className='headerTitle'>T<span style={assB}>a</span><span style={assO}>ss</span>k Management</p>
      </div>
      <div style={{display: "flex", flexWrap: 'nowrap', fontFamily: "fontss", width: "100vw", overflowX: "auto", zIndex: "0"}}>
        {TGs}
      </div>
     {debug && <p>
        {`name: ${data && data.data.name}`} <br />
        {`created at: ${data &&  data.data.crtdAt}`} <br />
        {`pallette: ${data && data.data.pall}`} <br />
        {`openTGs: ${data?.data?.defaults?.openTGs.join(' : ')}`} <br />
        {`Saved Pallettes: ${data &&  data.data.defaults.savedColors}`} <br />      
        {`tags: ${data && data.data.tags}`} <br />
        {`TGs: ${data && data.data.TGs.map(tg => tg.taskGroupName + '__ DESCRIPTION: ' + tg.desc + '__CREATED_AT: ' + tg.createdAt + '__TAGS: ' + tg.tags + '__ __ __TASKS: ' + tg.tasks.map(t => '______TASK_NAME: ' + t.taskName + '__CREATED_AT: ' + t.createdAt + '__TASK: ' + t.task + '__'))}`} <br />
      </p>}
      {/* <div className="headerBar" style={{background: c.bright}}></div>
      <div className="headerBar" style={{background: c.light}}></div>
      <div className="headerBar" style={{background: c.altLight}}></div>
      <div className="headerBar" style={{background: c.vibr}}></div> */}

    </>
  )
}

export default Shell
