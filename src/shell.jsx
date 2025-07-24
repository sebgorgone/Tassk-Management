import { useState, useEffect } from 'react'
import './assets/index.css'
import { pallette } from './assets/DefaultPallettes'
import TaskGroup from './TaskGroup.jsx'
import ColorEditor from './assets/ColorEditor.jsx'
function Shell() {
  localStorage.clear()
  //state
  const [data, setData] = useState(null)
  console.log('DATA VALUE: ', data)

  //style

  let c = pallette[1]

  const debug = false;

  const [files, setFiles] = useState(false);

  const [newTGField, setNewTGField] = useState(false);

  const [colorEditor, setColorEditor] = useState(false);


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
    color: c.vibr,
    borderColor: c.vibr
  }

  const buttonTilte = {
    color: c.bright,
    fontSize: "1.7em",
    margin: "0",
    marginRight: '.25em'
  }

  const buttonTilteB = {
    color: c.vibr,
    fontSize: "1.7em",
    margin: "0",
    marginRight: '.25em',
    alignSelf: "center"
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

function handleOpenTG(index) {
  setData(prev => {
    if (!prev) return prev;

    const src = prev.data ? prev.data : prev;

    const name = src.TGs[index].taskGroupName;
    const open = src.defaults?.openTGs ?? [];

    if (open.includes(name) || open.length >= 5) return prev;

    const updated = {
      ...src,
      defaults: {
        ...src.defaults,
        openTGs: [name, ...open]
      }
    };

    localStorage.setItem('data', JSON.stringify(updated));
    return updated;
  });
}

function handleCloseTG(index) {
  setData(prev => {
    if (!prev) return prev;

    const src = prev.data ? prev.data : prev;

    const name = src.TGs[index].taskGroupName;
    const open = src.defaults?.openTGs ?? [];

    const newOpen = open.filter(n => n !== name);

    const updated = {
      ...src,
      defaults: {
        ...src.defaults,
        openTGs: newOpen
      }
    };

    localStorage.setItem('data', JSON.stringify(updated));
    return updated;
  });
}

function handleAddPall(newPall) {
  setData(prev => {
    if (!prev) return prev;

    const src = prev.data ? prev.data : prev;

    const updated = {
      ...src,
      pallettes: [newPall, ...(Array.isArray(src.pallettes) ? src.pallettes : [])]
    };

    localStorage.setItem('data', JSON.stringify(updated));
    return updated;
  });
}

function handleUpdatePall(newPall, index) {
  setData(prev => {
    if (!prev) return prev;

    const src = prev.data ? prev.data : prev;
    const existing = Array.isArray(src.pallettes) ? src.pallettes : [];

    const updatedPallettes = existing.map((p, i) => (i === index ? newPall : p));

    const updated = {
      ...src,
      pallettes: updatedPallettes
    };

    localStorage.setItem('data', JSON.stringify(updated));
    return updated;
  });
}



  // task group lists

  const [TGs, setTGs] = useState('loading');

  const TGList = data && data.TGs.map((tg, index) => {
    return (
      <div key={index} className='TGList' style={{display: "inline-block", minWidth: "max-content"}}>
        {(tg.iconPath && files) && <img style={{position: 'absolute', width: '2em', left: -8}} src={tg.iconPath}/>}
        <button type='button' onClick={() => handleOpenTG(index)} style={{margin: "0", marginLeft: "1.5em", color: c.light, fontSize: ".85em", border: "0"}} className='TGListButton'>{tg.taskGroupName}</button>
      </div>
    )
  })

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
  if (data) {
    const openTGs = data.TGs
      .map((tg, i) => ({ tg, i }))
      .filter(({ tg }) => data.defaults.openTGs.includes(tg.taskGroupName))
      .map(({ tg, i }) => (
        <TaskGroup
          debug={debug}
          desc={tg.desc}
          name={tg.taskGroupName}
          tags={tg.tags}
          createdAt={tg.createdAt}
          tasks={tg.tasks}
          key={`${tg.taskGroupName}-${i}`}
          pallette={tg.pall ? tg.pall : pallette[1]}
          icon={tg.iconPath}
          index={i}
          updateArray={(na) => handleUpdateArray(i, na)}
          updateSettings={(newName, newDesc) => handleUpdateSettings(i, newName, newDesc)}
          favorited={() => handleUpdateFavorited(i)}
          open={data.TGs.length}
          closeTG={() => handleCloseTG(i)}
        />
      ));
    setTGs(openTGs);
    setColorEditor(true)
  }
}, [data]);

  return (
    <>
      <div style={{position: 'fixed',top: '0', left: '0', minWidth: "100vw", minHeight: "100vh", zIndex: "-2", background: c.dark}}></div>
      <img src='./vectorGraphics/assStencil.svg' style={{position: 'fixed',marginLeft: "10%", marginTop: "10em", width: "80%", zIndex: "-1"}}/>
      <div className="headerBar" style={header}>
        <img src='./vectorGraphics/ass.svg' className='headerIcon'/>

        <div style={{display: "flex", transition: "2s", fontFamily: "fontss"}} className='headerButtonDiv'><button type='button' className='taskOptions' style={{height: "fit-content",marginTop: "1em", border: "none", borderRadius: "1em", fontFamily: "fontss"}} onClick={() => {setNewTGField(false);setColorEditor(true)}}>pallettes🎨</button></div>

        <div style={{display: "flex", flexDirection: "column", alignItems: "top"}}>
          <p style={body} className='headerTitle'>T<span style={assB}>a</span><span style={assO}>ss</span>k Management</p>
          <div style={{display: "flex", flexFlow: "row", alignItems: 'center', justifyContent: "right", paddingRight: "2em"}} className='headerButtonDiv'>
            <p style={buttonTilte} className='task'>New Task Group</p>
            <button style={button} className='TGButton' type='button' onClick={() => {setNewTGField(!newTGField)}}>✚</button>
          </div>
          <div style={{display: "flex", flexFlow: "row", alignItems: 'right', justifyContent: "right", paddingRight: "1.5em"}} className='headerButtonDiv'>
            <p style={buttonTilteB} className='task'>Task Groups</p>
            <button style={{aspectRatio: '3 / 4', marginRight: ".25em", width: "2em"}} id='folder-btn' type='button' onClick={() => {setNewTGField(false);setColorEditor(false); setFiles(true)}} />
          </div>
        </div>
        
        
      </div>

      {newTGField ? 
        <div style={{
          width: "100%",
          background: "rgb(0, 0, 0, .65)",
          height: "calc(100vh - 1.75em)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "fontss",
            color: c.light
          }}>
            <h1>New Task Group</h1>
          </div>
        </div>
        : 
        colorEditor ? <>
          <div style={{width: '100%', background: "rgb(0,0,0,.4)", transition: "600ms ease", display: "flex", flexDirection: "column", minHeight: "100vh"}} className='files'>
            <ColorEditor 
              savedPallettes={data.pallettes}
              sysPallette={pallette[1]}
              create={(np) => handleAddPall(np)}
              update={(up, index) => handleUpdatePall(up, index)}
            />
          </div>
        </>:<>
          <div style={{display: "flex", flexWrap: 'nowrap', fontFamily: "fontss", width: "100vw", overflowX: "auto", zIndex: "0"}}>
          <div style={{width: files ? "10em" : '0', background: files ? "rgb(0,0,0,.4)" : "0", transition: "600ms ease", display: "flex", flexDirection: "column", overflow: "hidden", height: "calc(100vh - 1.75em)"}} className='files'>
            <button style={{color: files ? c.altLight : 'rgb(0, 0, 0, 0)', margin: ".15em", width: "50%", alignSelf: "center", marginTop: ".5em", tansition: "200ms", borderRadius: "1em", border: files ? `solid .13em ${c.altLight}` : 'rgb(0, 0, 0, 0)', overflowX: "hidden"}} type='button' onClick={() => {setFiles(!files)}} className='taskGroupOptions'>close</button>
            {TGList}
          </div>
        {TGs}
      </div>
      </>}


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
