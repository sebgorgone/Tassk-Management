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


  const [newTG, setNewTG] = useState(null);


  const [nameTG, setNameTG] = useState(null);

  const [descTG, setDescTG] = useState(null);

  const [pallTG, setPallTG] = useState(null);

  const [favTG, setFavTG] = useState(false);


  const [pallTGField, setPallTGField] = useState(false)



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

function handleDelTG(index) {
  setData(prev => {
    if (!prev) return prev;

    // normalize shape
    const src = prev.data ? prev.data : prev;

    // Remove the TG at the specified index
    const existingTGs = Array.isArray(src.TGs) ? src.TGs : [];
    const removedName = existingTGs[index]?.taskGroupName;
    const newTGs = existingTGs.filter((_, i) => i !== index);

    // Also remove from openTGs if present
    const existingOpen = Array.isArray(src.defaults?.openTGs) ? src.defaults.openTGs : [];
    const newOpenTGs = existingOpen.filter(name => name !== removedName);

    const updated = {
      ...src,
      TGs: newTGs,
      defaults: {
        ...src.defaults,
        openTGs: newOpenTGs
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

function handleDelPall(idx) {
  setData(prev => {
    if (!prev) return prev;

    const src = prev.data ? prev.data : prev;
    const existing = Array.isArray(src.pallettes) ? src.pallettes : [];

    // remove by index
    const updatedPals = existing.filter((_, i) => i !== idx);

    const updated = {
      ...src,
      pallettes: updatedPals
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

function handleTGPall(newPall, tgIndex) {
  setData(prev => {
    if (!prev) return prev;

    const src = prev.data ?? prev;
    const existing = Array.isArray(src.TGs) ? src.TGs : [];

    const newTGs = existing.map((tg, i) =>
      i === tgIndex
        ? { ...tg, pall: newPall ?? tg.pall }
        : tg
    );

    const updated = { ...src, TGs: newTGs };

    localStorage.setItem('data', JSON.stringify(updated));
    return updated;
  });
}

function handleAddTG () {
  setData(prev => {
    if (!prev) return prev;

    const src = prev.data ?? prev;
    const existing = Array.isArray(src.TGs) ? src.TGs : [];

    const newTGs = [newTG, ...existing]

    const updated = { ...src, TGs: newTGs };

    localStorage.setItem('data', JSON.stringify(updated));
    setNewTG(null);
    setNameTG('');
    setDescTG('');
    setFavTG(false);
    setPallTG(null)
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
          pallettes={data.pallettes}
          updatePallette={nP => handleTGPall(nP, i)}
          delete={() => handleDelTG(i)}
        />
      ));
    setTGs(openTGs);
  }
}, [data]);


useEffect(() => {
  if (newTG === null) return
  handleAddTG();
}, [newTG])

  return (
    <>
      <div style={{position: 'fixed',top: '0', left: '0', minWidth: "100vw", minHeight: "100vh", zIndex: "-2", background: c.dark}}></div>
      <img src='./vectorGraphics/assStencil.svg' style={{position: 'fixed',marginLeft: "10%", marginTop: "10em", width: "80%", zIndex: "-1"}}/>
      <div className="headerBar" style={header}>
        <button className='headerIcon' style={{background: 0, border: 0}} onClick={e => {e.preventDefault(); setColorEditor(false); setNewTGField(false); setFiles(true)}}><img src='./vectorGraphics/ass.svg'/></button>

        <div style={{display: "flex", transition: "2s", fontFamily: "fontss"}} className='headerButtonDiv'><button type='button' className='taskOptions' style={{height: "fit-content",marginTop: "1em", border: "none", borderRadius: "1em", fontFamily: "fontss", fontSize: "1.5em", padding: ".3em"}} onClick={() => {setNewTGField(false);setColorEditor(true)}}>pallettes🎨</button></div>

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


          <div style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "fontss",
            color: c.light,
            width: "100%"
          }}>
            <input type='text' style={{textAlign: "center", fontFamily: "fontss", width: "40%", fontWeight: "bold", fontSize: "1.5em"}} placeholder='Task Group Name' value={nameTG} onChange={(e) => setNameTG(e.target.value)}/>
          </div>

          <div style={{ background: "grey", display: "flex", padding: ".35em", marginRight: ".5em", marginBottom: ".2em", height: "2.5em", width: "80%", marginTop: "1em"}}>
             <div style={{background: pallTG ? pallTG.vibr : c.vibr, flex: 1}}></div>
             <div style={{background: pallTG ? pallTG.bright : c.bright, flex: 1}}></div>
             <div style={{background: pallTG ? pallTG.light : c.light, flex: 1}}></div>
             <div style={{background: pallTG ? pallTG.altLight : c.altLight, flex: 1}}></div>
             <div style={{background: pallTG ? pallTG.dark : c.dark, flex: 1}}></div>
          </div>

          <div style={{
            margin: "1em",
            display: "flex",
            justifyContent: "space-around",
            fontFamily: "fontss",
            color: c.light,
            width: "100%"
          }}>

            <button type='button' className="colorPalletteList" style={{border: 0,fontFamily: "fontss", alignSelf: "center", margin: ".5em", padding: ".4em", borderRadius: ".5em", display: "flex"}} onClick={() => setPallTGField(!pallTGField)}>
              palette
              <div style={{width: "3em", background: "grey", display: "flex", padding: ".15em", marginLeft: ".5em", marginBottom: ".2em"}}>
                 <div style={{background: 'red', flex: 1}}></div>
                 <div style={{background: 'green', flex: 1}}></div>
                 <div style={{background: 'blue', flex: 1}}></div>
                 <div style={{background: 'yellow', flex: 1}}></div>
                 <div style={{background: 'black', flex: 1}}></div>
              </div>
            </button>

             <div style={{display: "flex", justifyContent: "center"}}>
              <p style={{margin: "0", alignSelf: "center"}}>Favorite</p>
              <div style={{display: "flex", justifyContent: "center", width: "100%", overflow: "hidden", paddingLeft: ".2em", paddingRight: ".2em", alignItems: "center"}}>
                 <button onClick={e => {e.preventDefault(); setFavTG(!favTG);}} style={{margin: ".5em",padding: ".4em", fontFamily: 'fontss', fontSize: 'calc(10px + .5vw)', minWidth: "40px", borderRadius: "2em", border: `none`, color: c.dark, alignSelf: "center"}} className='taskOptions'><img src={favTG ? './vectorGraphics/ass.svg' : './vectorGraphics/assStencil.svg'} style={{width: "2.4em", paddingTop: ".5em"}}/></button>
                 <p style={{fontSize: "1.5em"}}>{!favTG ? '❌' : '✅'}</p>
              </div>
             </div>

          </div>

          <div style={{display: "flex", flexWrap: "wrap", marginBottom: "2em"}}>
          {pallTGField ? data.pallettes.map((p, index) => (
               <button
                 key={`${p.name}-${index}`}
                 type='button'
                 className="colorPalletteList"
                 style={{
                   border: 0,
                   fontFamily: "fontss",
                   alignSelf: "center",
                   margin: ".5em",
                   padding: ".4em",
                   borderRadius: ".5em",
                   display: "flex"
                 }}
                 onClick={() => setPallTG(p)}
               >
                 {p.name}
                 <div style={{width: "3em", background: "grey", display: "flex", padding: ".15em", marginLeft: ".5em", marginBottom: ".2em"}}>
                  <div style={{background: p.vibr, flex: 1}}></div>
                  <div style={{background: p.bright, flex: 1}}></div>
                  <div style={{background: p.light, flex: 1}}></div>
                  <div style={{background: p.altLight, flex: 1}}></div>
                  <div style={{background: p.dark, flex: 1}}></div>
               </div>
               </button>
            )) : null}
            </div>

            <div style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}>
              <textarea 
              type='text'
              style={{width: "45%", fontFamily: "fontss"}}
              placeholder='Task Group Description/Notes'
              value={descTG}
              onChange={(e) => setDescTG(e.target.value)}
              />
              <button className='taskGroupButton'
                style={{margin: ".5em",padding: ".4em", fontFamily: 'fontss', fontSize: 'calc(10px + .5vw)', minWidth: "80px", borderRadius: "1em", border: `solid .2em ${c.light}`, color: c.light, maxHeight: "3em", alignSelf: "center"}}
                onClick={ e => {
                   e.preventDefault();
                   if(nameTG === '' || nameTG === null) return alert('It needs a name goofball')
                   setNewTG(
                      {
                         taskGroupName: nameTG,
                         pall: pallTG,
                         iconPath: favTG ? './vectorGraphics/ass.svg' : './vectorGraphics/assStencil.svg',
                         desc: descTG === null ? null : descTG,
                         createdAt: new Date().toLocaleString(),
                         tasks: []
                      }
                    
                   );
                   setNewTGField(false);
                   setFiles(true);
                }}>
                   create
              </button>
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
              delete={(index) => {handleDelPall(index)}}
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
