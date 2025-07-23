

//props = { taskName: "New Task 2 for TG 2", NULL
//          createdAt: "7/23/2025, 9:57:58 AM", NOT NULL
//          task: "DO THIS AGAIN 2", NOT NULL
//          dueDate: "7/24/2025, 9:57:58 AM" NULL}
function Task (props) {

   //handlers

   return (<>
   <div style={{display: "flex", alignItems: "top", justifyContent: "space-between"}}>
      <h2 
      style={{margin: "0", marginRight: ".3em", background: "rgba(150, 150, 150, .3)", color: 'white', paddingRight: ".75em",paddingBottom: ".2em", paddingLeft: ".2em", borderBottomRightRadius: "1em"}}
      >{props.taskName}
      </h2>
      <p style={{margin: "0", color: props.pallette.light, padding: ".2em"}}> 
         Due On: {props.dueDate ? props.dueDate : '___'}
      </p>
   </div>

   <div style={{margin: "auto", width: "fit-content", fontFamily: "fonthw", color: props.pallette.light, maxWidth: "80%"}}>{props.task}</div>

   <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
   <div style={{color: props.pallette.altLight,  paddingLeft: ".2em"}}>
      {props.createdAt}
   </div>
      

      <div style={{width: "max-content"}}>
         {props.index > 0 ? <button style={{color: props.pallette.light, border: 'none', borderRadius: "1em", marginRight: ".2em"}} className="taskOptions" type='button' onClick={() => props.moveUp()}>↑</button> : null}
         {props.index !== props.length - 1 ? <button style={{color: props.pallette.light, border: 'none', borderRadius: "1em", marginRight: ".2em"}} className="taskOptions" onClick={() => props.moveDown()}>↓</button> : null}
         <button style={{color: 'rgb(255,0,0)', border: 'none', borderRadius: "1em", marginRight: ".2em"}} className="taskOptions" type='button' onClick={() => props.remove()}>Done</button>
      </div>
   </div>
   </>)
}

export default Task;