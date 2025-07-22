

//props = { taskName: "New Task 2 for TG 2", NULL
//          createdAt: "7/23/2025, 9:57:58 AM", NOT NULL
//          task: "DO THIS AGAIN 2", NOT NULL
//          dueDate: "7/24/2025, 9:57:58 AM" NULL}
function Task (props) {
   


   return (<>
   <div style={{display: "flex", alignItems: "top", justifyContent: "space-between"}}>
      <h2 
      style={{margin: "0"}}
      >{props.taskName}
      </h2>
      <p style={{margin: "0", color: props.pallette.light}}> 
         Due On: {props.dueDate ? props.dueDate : '___'}
      </p>
   </div>

   <div style={{margin: "auto", width: "fit-content", fontFamily: "fonthw", color: props.pallette.light}}>{props.task}</div>

   <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>

      {props.createdAt}

      <div style={{width: "fit-content"}}>
         <button>↑</button>
      </div>
   </div>
   </>)
}

export default Task;