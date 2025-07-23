import Task from "./assets/task"
import { useState, useEffect } from "react";

function TaskGroup (props) {
   //state
   const [newTaskField, setNewTaskField] = useState(false);
   const [infoField, setInfoField] = useState(false);
   const [settingsField, setSettingsField] = useState(false)

   const [newTask, setNewTask] = useState();

   const [tName, setTName] = useState(null);
   const [t, setT] = useState(null);
   const [dueDate, setDueDate] = useState();

   //handlers
   function setFalseFields() {
      setNewTaskField(false)
      setInfoField(false)
      setSettingsField(false)

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
      const newArray = [...array];
      console.log(`inital: -${JSON.stringify(newArray)}-`);
      newArray.push(newTask)
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
      setNewTaskField(prev => !prev);
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
      <div style={{flexDirection: 'column', flex: "1", minWidth: "0",maxWidth: "100%", overflowY: "scroll"}}>
         <div style={{background: props.pallette.vibr, minWidth: "0",maxWidth: "100%", overflowX: "auto", display: "flex", flexFlow: "column", borderTop: `${props.pallette.bright} solid .5em`, borderLeft: !newTaskField ? `${props.pallette.bright} solid` : 'none', borderBottomRightRadius: newTaskField ? '2em' : '0', borderBottomLeftRadius: newTaskField ? '2em' : '0' }}>
            {props.debug && <p>--TG NAME: {props.name}--description: {`${props.desc}`}--icon path: {props.icon} -- tags: {props.tags}--color: {props.pallette.vibr} --Created At: {props.createdAt}-- Tasks:⬇️⬇️⬇️<br /> {props.tasks.map(t => '---------------------------------------------------------------------------------------------------------------------TASK_NAME: \n' + t.taskName + ' ___CREATED_AT: ' + t.createdAt + '___TASK: ' + t.task + '___DUE_DATE: ' + t.dueDate)}</p>}

            <div style={{display: "flex", justifyContent: "space-between", width: "100%", overflow: "hidden", alignItems: "center", marginTop: ".75em", flexWrap: "nowrap"}}>
               <img className='taskGroupIcon' src={props.icon} style={{width: "4em", paddingTop: ".5em"}} />


               <div style={{
                 display: "flex",
                 flexWrap: "wrap",
                 alignItems: "flex-start",
                 rowGap: "0.5em",
                 columnGap: "0.5em",
                 width: "100%"
               }}>

                  <header className='taskGroupHeader' style={{background: props.pallette.bright, color: props.pallette.light, fontSize: "calc(1vw + 10px)", marginRight: ".5em",paddingRight: "1em",paddingLeft: ".3em", width: "fit-content", borderTopLeftRadius: ".5em", borderBottomLeftRadius: ".5em", flexShrink: "0"}}>{props.name}</header>

                  <div style={{display: "flex", justifyContent: "center", width: "100%", overflow: "wrap"}}>

                     <button className='taskGroupButton'
                        style={{margin: ".5em",padding: ".4em", fontFamily: 'fontHW', fontSize: 'calc(3px + .5vw)', minWidth: "40px", borderRadius: "1em", border: `solid .2em ${props.pallette.dark}`, color: props.pallette.dark, maxHeight: "3em", alignSelf: "center", flexGrow: "1"}}
                        onClick={handleNewTaskField}
                     >ADD TASK </ button>
                     <button 
                        type='button'
                        onClick={() => {
                           setFalseFields();
                           setInfoField(true);
                        }}
                        style={{border: "none", borderRadius: "1.5em", paddingTop: ".3em", marginRight: "0em"}} 
                        className='taskGroupOptions'
                     ><img src='./vectorGraphics/info-circle-fill-svgrepo-com.svg' style={{ width: "calc(1.4em + 1vw)", aspectRatio: "1 / 1"}}/>
                     </button>
                     <button style={{border: "none", borderRadius: "1.5em", paddingTop: ".3em", paddingRight: ".25em"}} className='taskGroupOptions' ><img src='./vectorGraphics/settings-2-svgrepo-com.svg' style={{ width: "calc(1.4em + 1vw)", aspectRatio: "1 / 1"}} /></button>

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
                  <button className='taskGroupButton'
                           style={{margin: ".5em",padding: ".4em", fontFamily: 'fontss', fontSize: 'calc(10px + .5vw)', minWidth: "20px", borderRadius: "1em", border: `solid .2em ${props.pallette.dark}`, color: props.pallette.dark, maxHeight: "3em", alignSelf: "center", flexGrow: "1"}}
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
                     style={{width: "85%", fontFamily: "fonthw", fontSize: ".7em"}}
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

                  <div style={{display: "flex", justifyContent: "right", width: "100%", overflow: "hidden", padding: ".2em"}}>
                     <img className='taskGroupIcon' src={props.icon} style={{width: "2.4em", paddingTop: ".5em"}} />
                  </div>

               </div>: null}

         </div>
         {tasks}
      </div>
         
)
}

export default TaskGroup