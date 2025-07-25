import Task from "./assets/task"
import { useState, useEffect } from "react";

function TaskGroup (props) {
   //state
   const [newTaskField, setNewTaskField] = useState(false);
   const [infoField, setInfoField] = useState(false);
   const [settingsField, setSettingsField] = useState(false);

   const [palletteSettings, setPalletteSettings] = useState(false);

   const [newTask, setNewTask] = useState();

   const [tName, setTName] = useState(null);
   const [t, setT] = useState(null);
   const [dueDate, setDueDate] = useState(null);

   const [newTGName, setNewTGName] = useState('');
   const [newTGDesc, setNewTGDesc] = useState('');


   //handlers
    function setFalseFields() {

       setNewTaskField(false)
       setInfoField(false)
       setSettingsField(false)
       setPalletteSettings(false)
 
       setTName('');
       setT('');
       setDueDate('');
       setNewTask('');

   }

   function moveItem(array, fromIndex, toIndex) {
      console.log(`moving item inside of ${array} from index: -${fromIndex}- to index: -P-`)
      const newArray = [...array]; 
      console.log('inital array: ' + JSON.stringify(newArray))
      const [movedItem] = newArray.splice(fromIndex, 1);
      newArray.splice(toIndex, 0, movedItem);
      console.log('converted array' + JSON.stringify(newArray))
      return newArray;
   }

   function removeItem(array, removedIndex) {
      console.log(`removing index ${removedIndex}`);
      const newArray = [...array];
      console.log(`inital: -${JSON.stringify(newArray)}-`);
      newArray.splice(removedIndex, 1)
      console.log('updated: ' + JSON.stringify(newArray))
      return newArray
   }

   function addItem(array) {
      console.log('adding item to: ' + array)
      let newArray = [...array];
      console.log(`inital: -${JSON.stringify(newArray)}-`);
      newArray = [ newTask, ...newArray]
      console.log('updated: ' + JSON.stringify(newArray));
      props.updateArray(newArray);
      setTName('');
      setT('');
      setDueDate('');
      setNewTask('');
   }

   function handleNewTaskField (e) {
      e.preventDefault();
      setFalseFields();
      setNewTaskField(!newTask);
   }

   
   //tasks lists 


   const tasks = props.tasks ? 
      props.tasks.map(((t, index) => {
         return (<div key={index} style={{border:`solid .3em ${props.pallette.altLight}`, borderRadius: ".5em", margin: "auto",marginTop: ".5em", width: "85%"}}>
            <Task index={index} taskName={t.taskName} createdAt={t.createdAt} task={t.task} dueDate={t.dueDate} pallette={props.pallette} length={props.tasks.length} moveUp={() => props.updateArray(moveItem(props.tasks, index, index - 1))} moveDown={() => props.updateArray(moveItem(props.tasks, index, index + 1))} remove={() => props.updateArray(removeItem(props.tasks, index))}/>
         </div>)
      }))  : 'loading';

      //useEffect

   
   useEffect(() => {
      if (!newTask) return;
      addItem(props.tasks);
   }, [newTask])

   return (
      <div style={{flexDirection: 'column', flex: "1", minWidth: "0",maxWidth: "100%", overflowY: "scroll", height: "calc(100vh - 1.75em)"}}>
         
         <div style={{background: props.pallette.vibr, overflowX: "hidden", display: "flex", flexFlow: "column", borderTop: `${props.pallette.bright} solid .5em`, borderLeft: (!newTaskField && !infoField && !settingsField) ? `${props.pallette.bright} solid` : 'none', borderBottomRightRadius: (newTaskField || infoField || settingsField) ? '2em' : '0', borderBottomLeftRadius: (newTaskField || infoField || settingsField) ? '2em' : '0'}}>
            {props.debug && <p>--TG NAME: {props.name}--description: {`${props.desc}`}--icon path: {props.icon} -- tags: {props.tags}--color: {props.pallette.vibr} --Created At: {props.createdAt}-- Tasks:⬇️⬇️⬇️<br /> {props.tasks.map(t => '---------------------------------------------------------------------------------------------------------------------TASK_NAME: \n' + t.taskName + ' ___CREATED_AT: ' + t.createdAt + '___TASK: ' + t.task + '___DUE_DATE: ' + t.dueDate)}</p>}

            <div style={{display: "flex", justifyContent: "space-between", width: "100%", overflow: "hidden", alignItems: "center", marginTop: ".1em", flexWrap: "nowrap", position: "relative", boxSizing: "border-box"}}>
               <button type='button' style={{position: 'absolute', top: 1,left: 3, border: "none", transition: "200ms", borderRadius: "1em", zIndex: "5"}} className="TGListButton" onClick={() => props.closeTG()}>ⓧ</button>
               <div style={{minWidth: "3.5em", height: "3.83em"}}> 
                  <img className='taskGroupIcon' src={props.icon} style={props.icon === "./vectorGraphics/assStencil.svg" ? {width: "4em", paddingTop: ".5em"} : {width: "6.7em",height: "6.7em", maxWidth: "none", margin: "0", position: "absolute", top: -16, left: -30}} />
               </div>

               <div style={{
                 display: "flex",
                 flexWrap: "wrap",
                 alignItems: "flex-start",
                 rowGap: "0.5em",
                 columnGap: "0.5em",
                 width: "100%"
               }}>

                  <header className='taskGroupHeader' style={{background: props.pallette.bright, color: props.pallette.light, fontSize: "calc(1vw + 10px)", marginRight: ".5em",paddingRight: "1em",paddingLeft: ".3em", width: "fit-content", borderTopLeftRadius: ".5em", borderBottomLeftRadius: ".5em", flexShrink: "0"}}>{props.name}</header>

                  <div style={{display: "flex", justifyContent: "left", width: "80%", overflow: "wrap"}}>

                     <button className='taskGroupButton'
                        style={{margin: ".5em",padding: ".4em", fontFamily: 'fontHW', fontSize: 'calc(3px + .5vw)', minWidth: "40px", borderRadius: "1em", border: `solid .2em ${props.pallette.dark}`, color: props.pallette.dark, maxHeight: "3em", alignSelf: "center", flexGrow: "1"}}
                        onClick={handleNewTaskField}
                     >ADD TASK </ button>
                     <button 
                        type='button'
                        onClick={() => {
                           setFalseFields();
                           setInfoField(!infoField);
                        }}
                        style={{border: "none", borderRadius: "1.5em", paddingTop: ".3em", marginRight: "0em"}} 
                        className='taskGroupOptions'
                     ><img src='./vectorGraphics/info-circle-fill-svgrepo-com.svg' style={{ width: "calc(1.4em + 1vw)", aspectRatio: "1 / 1"}}/>
                     </button>
                     <button style={{border: "none", borderRadius: "1.5em", paddingTop: ".3em", paddingRight: ".25em"}} className='taskGroupOptions' onClick={e => {e.preventDefault(); setFalseFields(); setSettingsField(!settingsField)}} ><img src='./vectorGraphics/settings-2-svgrepo-com.svg' style={{ width: "calc(1.4em + 1vw)", aspectRatio: "1 / 1"}} /></button>

                  </div>
               </div>           
            </div>
            {newTaskField ? <form>   
               <div style={{display: "flex", justifyContent: "space-between", width: "100%", overflow: "hidden"}}>
                  <input
                     style={{margin: ".5em", fontFamily: 'fontHW', fontSize: '.7em', flex: "1", minWidth: "0",}}
                     type='text'
                     placeholder='Task Name'
                     value={tName}
                     onChange={e => {
                        setTName(e.target.value);
                     }}
                  />
                  <button className='taskGroupButton'
                           style={{margin: ".5em",padding: ".4em", fontFamily: 'fontss', fontSize: 'calc(10px + .5vw)', minWidth: "40px", borderRadius: "1em", border: `solid .2em ${props.pallette.dark}`, color: props.pallette.dark, maxHeight: "3em", alignSelf: "center", flexGrow: "1"}}
                           onClick={ e => {
                              e.preventDefault();
                              if(tName === '' || tName === null) return alert('It needs a name goofball')
                              setNewTask(
                                 {
                                    taskName: tName,
                                    createdAt: new Date().toLocaleString(),
                                    task: t,
                                    dueDate: dueDate ? dueDate : null
                                 }
                                 
                              );
                           }}>
                              add
                  </button>
                  <button className='closeButton'
                           style={{margin: ".5em",padding: ".4em", fontFamily: 'fontss', fontSize: 'calc(10px + .5vw)', minWidth: "20px", borderRadius: "2em", border: `0`, color: props.pallette.vibr, maxHeight: "3em", alignSelf: "center", flexGrow: "1"}}
                           type='button'
                           onClick={setFalseFields}>
                              close
                  </button>
               </div>
                <div style={{display: "flex", justifyContent: "center", width: "100%", overflow: "hidden"}}>
                  <p style={{margin: "0"}}>Task</p>
               </div>
               <div style={{display: "flex", justifyContent: "center", width: "100%", overflow: "hidden"}}>
                  <textarea
                     style={{width: "85%", fontFamily: "fonthw", fontSize: ".7em", border: 'none'}}
                     value={t}
                     onChange={
                        e => setT(e.target.value)
                     }
                  />
               </div>
               <div style={{display: "flex", justifyContent: "center", width: "100%", overflow: "hidden"}}>
                  <p style={{margin: "0"}} value={dueDate} onChange={e => setDueDate(e.target.value)}>Due Date</p>
               </div>
               <div style={{display: "flex", justifyContent: "space-around", width: "100%", overflow: "hidden"}}>
                  <input 
                     type='date'
                     style={{
                        width: "50%",
                        marginBottom: ".5em",
                        fontFamily: "fontss",
                        textAlign: "center"
                     }}
                  />
               </div>
              </form> : null}
              {infoField ? <div>
                  <div style={{display: "flex", justifyContent: "space-around", width: "100%", overflow: "hidden", padding: ".2em"}}>
                     <button
                        style={{borderRadius: '1em', border: 'none', fontFamily: "fontss", fontSize: "1.3em", width: "40%", color: props.pallette.vibr}}
                        className="closeButton"
                        type='button'
                        onClick={() => {setFalseFields()}}
                     >close</button>
                  </div>

                  <div style={{display: "flex", justifyContent: "space-around", width: "100%", overflow: "hidden", padding: ".2em"}}>
                     <p style={{margin: ".3em", fontWeight: "bold", color: props.pallette.light}}>Description:</p>
                     <p style={{margin: ".1em", color: props.pallette.altLight}}>{props.desc}</p>
                  </div>

                  <div style={{display: "flex", justifyContent: "space-around", width: "100%", overflow: "hidden", padding: ".2em"}}>
                     <p style={{margin: ".3em", fontWeight: "bold", color: props.pallette.light}}>Created at: <span style={{color: props.pallette.altLight}}>{props.createdAt}</span></p>
                  </div>

                  <div style={{display: "flex", justifyContent: "right", width: "100%", overflow: "hidden", padding: ".5em", alignItems: "center"}}>
                     {props.icon === "./vectorGraphics/ass.svg" ?  'favorited' : null}
                     <img className='taskGroupIcon' src={props.icon} style={{width: props.icon === "./vectorGraphics/ass.svg" ? "6.5em" : "4em", paddingTop: ".5em", marginRight: "1em"}} />
                  </div>

               </div>: null} 

               {settingsField ? <form onSubmit={e => {e.preventDefault(); if((newTGName === '' && newTGDesc === '') || (newTGName === null && newTGDesc === null)) return alert('No changes'); props.updateSettings((newTGName === '' || newTGName === null) ? props.name : newTGName,(newTGDesc === '' || newTGDesc === null) ? props.desc : newTGDesc)}}>
                  <div style={{display: "flex", justifyContent: "space-between", width: "100%", overflow: "hidden"}}>
                     <input
                        style={{margin: ".5em", fontFamily: 'fontss', fontSize: '1em', flex: "1", minWidth: "0",}}
                        type='text'
                        placeholder={props.name}
                        value={newTGName}
                        onChange={e => {
                           setNewTGName(e.target.value);
                        }}
                     />
                     <button
                        style={{borderRadius: '2em', border: 'none', fontFamily: "fontss", fontSize: "1em", width: "40%", color: props.pallette.vibr, height: "60%", alignSelf: "center", marginRight: ".3em"}}
                        className="closeButton"
                        type='button'
                        onClick={() => {setFalseFields()}}
                     >close</button>
                  </div>

                  {/* pallette */}<h1 style={{margin: "0", width: "100%", textAlign: "center"}}>Palette</h1> 
                  <div style={{display: "flex", justifyContent: "center"}}>

                     
                     <button type='button' className="colorPalletteList" style={{border: 0,fontFamily: "fontss", alignSelf: "center", margin: ".5em", padding: ".4em", borderRadius: ".5em", display: "flex"}} onClick={() => setPalletteSettings(!palletteSettings)}>
                        {props.pallette.name ? props.pallette.name : 'Default'}
                        <div style={{width: "3em", background: "grey", display: "flex", padding: ".15em", marginLeft: ".5em", marginBottom: ".2em"}}>
                           <div style={{background: props.pallette.vibr, flex: 1}}></div>
                           <div style={{background: props.pallette.bright, flex: 1}}></div>
                           <div style={{background: props.pallette.light, flex: 1}}></div>
                           <div style={{background: props.pallette.altLight, flex: 1}}></div>
                           <div style={{background: props.pallette.dark, flex: 1}}></div>
                        </div>
                     </button>
                  </div>

                  {palletteSettings ? <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                     {props.pallettes.map((p, index) => (
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
                          onClick={() => props.updatePallette(p)}
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
                     ))}
                  </div> : <></>}

                  <div style={{display: "flex", width: "100%", overflow: "hidden", paddingLeft: ".2em", justifyContent: "center"}}>
                     <p style={{margin: "0", alignSelf: "center"}}>Favorited:</p>
                     <div style={{display: "flex", justifyContent: "center", width: "50%", overflow: "hidden", paddingLeft: ".2em", paddingRight: ".2em", alignItems: "center"}}>
                        <button onClick={e => {e.preventDefault(); props.favorited();}} style={{margin: ".5em",padding: ".4em", fontFamily: 'fontss', fontSize: 'calc(10px + .5vw)', minWidth: "40px", borderRadius: "2em", border: `none`, color: props.pallette.dark, alignSelf: "center"}} className='taskOptions'><img src={props.icon} style={{width: "2.4em", paddingTop: ".5em", paddingLeft: ".2em", paddingRight: ".2em"}}/></button>
                        <p style={{fontSize: "1.5em"}}>{props.icon === "./vectorGraphics/assStencil.svg" ? '❌' : '✅'}</p>
                     </div>
                  </div>

                  <div style={{display: "flex", justifyContent: "space-around", width: "100%", overflow: "hidden", padding: ".2em"}}>
                     <p style={{margin: "0"}}>description / notes</p>
                  </div>
                  <div style={{display: "flex", justifyContent: "space-around", width: "100%", overflow: "hidden", padding: ".2em"}}>
                     <textarea 
                        style={{borderBottomRightRadius: ".3em", borderBottomLeftRadius: ".3em", border: "none", fontFamily: "fontss", paddingBottom: ".1em", width: "80%"}}
                        placeholder={`${props.desc}`}
                        value={newTGDesc}
                        onChange={e => setNewTGDesc(e.target.value)}
                     />
                  </div>
                  <div style={{display: "flex", justifyContent: "space-around", width: "100%", overflow: "hidden", padding: ".2em"}}>
                     <button className='taskGroupButton'
                              style={{margin: ".5em",padding: ".4em", fontFamily: 'fontss', fontSize: 'calc(10px + .5vw)', minWidth: "80px", borderRadius: "1em", border: `solid .2em ${props.pallette.dark}`, color: props.pallette.dark, maxHeight: "3em", alignSelf: "center"}}
                              onClick={ e => {
                                 e.preventDefault();
                                 if((newTGName === '' && newTGDesc === '') || (newTGName === null && newTGDesc === null)) return alert('No changes');
                                 props.updateSettings((newTGName === '' || newTGName === null) ? props.name : newTGName,(newTGDesc === '' || newTGDesc === null) ? props.desc : newTGDesc);
                                 setNewTGName('');
                                 setNewTGDesc('');
                              }}>
                                 update
                     </button>
                     <button className='taskGroupButton'
                              style={{margin: ".5em",padding: ".4em", fontFamily: 'fontss', fontSize: 'calc(10px + .5vw)', minWidth: "80px", borderRadius: "1em", border: `solid .2em red`, color: 'red', maxHeight: "3em", alignSelf: "center"}}
                              onClick={ e => {
                                 e.preventDefault();
                                 props.delete();
                              }}>
                                 delete {props.name}
                     </button>
                  </div>
               </form> : null }

         </div>

         {tasks}
      </div>
         
)
}

export default TaskGroup