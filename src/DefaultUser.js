export const data = {
   name: "Tassk Manager",
   crtdAt: new Date().toLocaleString(),
   pallettes: [
      {
         vibr: "#cc2936",
         dark: "#08415c",
         light: "#6b818c",
         altLight: "#f1bf98",
         bright: "#eee5e9",
         name: 'default but red'
      },
      {
         vibr: "#F06449",
         dark: "#36382E",
         light: "#EDE6E3",
         altLight: "#DADAD9",
         bright: "#5BC3EB",
         name: 'default'
      }
   ],
   TGs: 
   [
      {
         taskGroupName: "New Task Group",
         pall: null,
         iconPath: "./vectorGraphics/assStencil.svg",
         desc: null,
         createdAt: new Date().toLocaleString(),
         tasks: 
         [
            {
               taskName: "New Task",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS",
               dueDate: null,
            },
            {
               taskName: "New Task 1",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS",
               dueDate: null,
            },
            {
               taskName: "New Task 2",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS",
               dueDate: null,
            },
            {
               taskName: "New Task 3",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS",
               dueDate: null,
            },
            
         ]         
      },
      {
         taskGroupName: "New Task Group 2",
         pall: null,
         iconPath: "./vectorGraphics/assStencil.svg",
         desc: 'The Second Task',
         createdAt: new Date().toLocaleString(),
         tasks: 
         [
            {
               taskName: "New Task 1 for TG 2",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS AGAIN DO THIS AGAIN DO THIS AGAIN DO THIS AGAIN",
               dueDate: null,
            },
            {
               taskName: "New Task 2 for TG 2",
               createdAt: new Date(Date.now() + 86400000).toLocaleString(),
               task: "DO THIS AGAIN 2",
               dueDate: new Date(Date.now() + 86400000 * 2).toLocaleString(),
            }
         ]         
      },
      {
         taskGroupName: "New Task Group 3",
         pall: null,
         iconPath: "./vectorGraphics/assStencil.svg",
         desc: 'The Third Task The Third Task The Third Task The Third Task The Third Task The Third Task',
         createdAt: new Date().toLocaleString(),
         tasks: 
         [
            {
               taskName: "New Task 1 for TG 2",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS AGAIN",
               dueDate: null,
            },
            {
               taskName: "New Task 2 for TG 2",
               createdAt: new Date(Date.now() + 86400000).toLocaleString(),
               task: "DO THIS AGAIN 2",
               dueDate: new Date(Date.now() + 86400000 * 2).toLocaleString(),
            }
         ]         
      },
      
   ],
   defaults:
   {
      openTGs: 
      [
         'New Task Group'
      ]
   }
}