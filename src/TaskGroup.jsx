import Task from "./assets/task"

function TaskGroup (props) {



   //tasks lists 

   const tasks = props.tasks ? 
      props.tasks.map(((t, index) => {
         return (<div key={index} style={{border:`solid .3em ${props.pallette.altLight}`, borderRadius: ".5em", margin: "auto",marginTop: ".5em", width: "85%"}}>
            <Task index={index} taskName={t.taskName} createdAt={t.createdAt} task={t.task} dueDate={t.dueDate} pallette={props.pallette} length={props.tasks.length}/>
         </div>)
      }))  : 'loading'





   return (
      <div style={{flexDirection: 'column', flex: "1", minWidth: "0",maxWidth: "100%", overflowY: "scroll"}}>
         <div style={{background: props.pallette.vibr, minWidth: "0",maxWidth: "100%", overflowX: "auto", display: "flex", flexFlow: "column", borderTop: `${props.pallette.bright} solid .5em`, borderLeft: `${props.pallette.bright} solid`}}>
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
                     >ADD TASK </ button>
                     <button style={{border: "none", borderRadius: "1.5em", paddingTop: ".3em", marginRight: "0em"}} className='taskGroupOptions'><img src='./vectorGraphics/info-circle-fill-svgrepo-com.svg' style={{ width: "calc(1.4em + 1vw)", aspectRatio: "1 / 1"}}/></button>
                     <button style={{border: "none", borderRadius: "1.5em", paddingTop: ".3em", paddingRight: ".25em"}} className='taskGroupOptions' ><img src='./vectorGraphics/settings-2-svgrepo-com.svg' style={{ width: "calc(1.4em + 1vw)", aspectRatio: "1 / 1"}} /></button>

                  </div>
               </div>           
            </div>

            {/* <div style={{display: "flex", justifyContent: "space-between", width: "100%", overflow: "hidden"}}>
               <input
                  style={{margin: ".5em", fontFamily: 'fontHW', fontSize: '.7em', flex: "1", minWidth: "0"}}
                  type='text'
                  placeholder='new task'
               />
               <button style={{margin: ".5em"}}>add</button>
            </div> */}
         </div>
         {tasks}
      </div>
         
)
}

export default TaskGroup