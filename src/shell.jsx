import { useState, useEffect } from 'react'
import './assets/index.css'
import { pallette } from './assets/DefaultPallettes'
import TaskGroup from './TaskGroup.jsx'
function Shell() {
  //state
  const [data, setData] = useState(null)
  console.log('DATA VALUE: ', data)

  //style

  let c = pallette[1]

  const debug = false;

  const [files, setFiles] = useState(true)


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
    marginRight: '.25em'
  }

  //handlers

  function handleUpdateArray(TGIndex, newArray) {
    if (!data) return;

    const src = data.data ? data.data : data;

    const newTGs = src.TGs.map((tg, i) =>
      i === TGIndex ? { ...tg, tasks: newArray } : tg
    );

    const updated = { ...src, TGs: newTGs };

    setData(updated);
    localStorage.setItem('data', JSON.stringify(updated));

    console.log('handleUpdateArray() applied:', {
      TGIndex,
      beforeLen: src.TGs.length,
      afterLen: updated.TGs.length,
      beforeTasks: src.TGs[TGIndex]?.tasks,
      afterTasks: updated.TGs[TGIndex]?.tasks
    });
  }

  function handleUpdateSettings(tgIndex, nextName, nextDesc) {
  setData(prev => {
    if (!prev) return prev;

    // unwrap if you ever had { data: {...} }
    const src = prev.data ? prev.data : prev;

    // update the TG
    const newTGs = src.TGs.map((tg, i) =>
      i === tgIndex
        ? {
            ...tg,
            taskGroupName: nextName ?? tg.taskGroupName,
            desc: nextDesc ?? tg.desc
          }
        : tg
    );

    // if the name changed, keep defaults.openTGs in sync
    let newDefaults = src.defaults;
    if (nextName && src.defaults?.openTGs) {
      newDefaults = {
        ...src.defaults,
        openTGs: src.defaults.openTGs.map(n =>
          n === src.TGs[tgIndex].taskGroupName ? nextName : n
        )
      };
    }

    const updated = { ...src, TGs: newTGs, defaults: newDefaults };

    localStorage.setItem('data', JSON.stringify(updated));
    return updated;
  });
}

  function handleUpdateFavorited(tgIndex) {
    setData(prev => {
      if (!prev) return prev;

      // unwrap if you ever had { data: {...} }
      const src = prev.data ? prev.data : prev;

      // update the TG
      const newTGs = src.TGs.map((tg, i) =>
        i === tgIndex
          ? {
              ...tg,
              iconPath: tg.iconPath === "./vectorGraphics/assStencil.svg" ? "./vectorGraphics/ass.svg" : "./vectorGraphics/assStencil.svg"
            }
          : tg
      );

      const updated = { ...src, TGs: newTGs};

      localStorage.setItem('data', JSON.stringify(updated));
      return updated;
    });
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
        const normalized = parsed && parsed.data ? parsed.data : parsed;
        setData(normalized);
        console.log('Loaded from localStorage (normalized):', normalized);
        return;
      } catch (e) {
        console.error('Bad JSON in localStorage:', e);
        localStorage.removeItem('data');
      }
    }

    import('./DefaultUser').then((module) => {
      const def = module.default || module;
      const normalizedDefault = def && def.data ? def.data : def;
      localStorage.setItem('data', JSON.stringify(normalizedDefault));
      setData(normalizedDefault);
      console.log('Loaded default data (normalized):', normalizedDefault);
    });
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, [data]);

useEffect(() => {
  if (data){ 
    const openTGs = data.TGs
      .filter(task => data.defaults.openTGs.includes(task.taskGroupName))
      .map((task, index) => (
        <TaskGroup
          debug={debug}
          desc={task.desc}
          name={task.taskGroupName}
          tags={task.tags}
          createdAt={task.createdAt}
          tasks={task.tasks}
          key={`${task.taskGroupName}-${index}`}
          pallette={pallette[Math.floor(Math.random() * 2)]}
          icon={task.iconPath}
          index={index}
          updateArray={(na) => handleUpdateArray(index, na)}
          updateSettings={(newName, newDesc) => handleUpdateSettings(index, newName, newDesc)}
          favorited={() => handleUpdateFavorited(index)}
          open={data.TGs.length}
        />
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

        <div style={{display: "flex", flexDirection: "column", alignItems: "top"}}>
          <p style={body} className='headerTitle'>T<span style={assB}>a</span><span style={assO}>ss</span>k Management</p>
          <div style={{display: "flex", flexFlow: "row", alignItems: 'center', justifyContent: "center"}} className='headerButtonDiv'>
            <p style={buttonTilte} className='task'>New Task Group</p>
            <button style={button}>＋</button>
          </div>
        </div>
        
        
      </div>

      <div style={{display: "flex", flexWrap: 'nowrap', fontFamily: "fontss", width: "100vw", overflowX: "auto", zIndex: "0"}}>
        <div style={{width: files ? "6em" : '0', background: files ? "rgb(0,0,0,.4)" : "0", transition: "450ms ease"}} className='files'></div>
        {TGs}
      </div>


     {debug && <p>
        {`name: ${data && data.name}`} <br />
        {`created at: ${data &&  data.crtdAt}`} <br />
        {`pallette: ${data && data.pall}`} <br />
        {`openTGs: ${data?.defaults?.openTGs.join(' : ')}`} <br />
        {`Saved Pallettes: ${data &&  data.defaults.savedColors}`} <br />      
        {`tags: ${data && data.tags}`} <br />
        {`TGs: ${data && data.TGs.map(tg => tg.taskGroupName + '__ DESCRIPTION: ' + tg.desc + '__CREATED_AT: ' + tg.createdAt + '__TAGS: ' + tg.tags + '__ __ __TASKS: ' + tg.tasks.map(t => '______TASK_NAME: ' + t.taskName + '__CREATED_AT: ' + t.createdAt + '__TASK: ' + t.task + '__'))}`} <br />
      </p>}
    </>
  )
}

export default Shell
