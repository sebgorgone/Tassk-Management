
function TaskGroup (props) {
   return (
      <div style={{flex: "1", background: props.pallette.vibr, minWidth: "0",maxWidth: "100%", overflowX: "auto", display: "flex", flexFlow: "column", borderTop: `${props.pallette.bright} solid .5em`}}>
         {props.debug && <p>--TG NAME: {props.name}--description: {`${props.desc}`}--icon path: {props.icon} -- tags: {props.tags}--color: {props.pallette.vibr} --Created At: {props.createdAt}-- Tasks:⬇️⬇️⬇️<br /> {props.tasks.map(t => '---------------------------------------------------------------------------------------------------------------------TASK_NAME: \n' + t.taskName + ' ___CREATED_AT: ' + t.createdAt + '___TASK: ' + t.task + '___DUE_DATE: ' + t.dueDate)}</p>}
         <div style={{display: "flex", justifyContent: "space-between", width: "100%", overflow: "hidden", alignItems: "center", marginTop: ".75em", flexWrap: "nowrap"}}>
            <img src={props.icon} style={{width: "4em", paddingTop: ".5em"}} />
            <header style={{alignSelf: "center", color: props.pallette.light, fontSize: "1.75em", marginRight: ".5em"}}>{props.name}<button style={{background: "none", border: "none", color: props.pallette.light, fontSize: ".65em"}}></button></header>
         </div>
         <div style={{display: "flex", justifyContent: "right", width: "100%", overflow: "hidden"}}>
            <button className='taskGroupButton'
               style={{margin: ".5em",padding: ".4em", fontFamily: 'fontHW', fontSize: '.7em', minWidth: "0", borderRadius: "1em", border: `solid .2em ${props.pallette.dark}`, color: props.pallette.dark}}
            >ADD TASK </ button>
            <button style={{margin: "0", border: "none", borderRadius: "1.5em", paddingTop: ".3em", margin: ".5em"}} className='taskGroupOptions'><img src='./vectorGraphics/info-circle-fill-svgrepo-com.svg' style={{ width: "2.25em", aspectRatio: "1 / 1"}}/></button>
            <button style={{margin: "0", background: "none", border: "none", borderRadius: "1.5em", paddingTop: ".3em", margin: ".5em"}}><img src='./vectorGraphics/settings-2-svgrepo-com.svg' style={{ width: "2.25em", aspectRatio: "1 / 1"}} className='taskGroupOptions'/></button>
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
         
)
}

export default TaskGroup