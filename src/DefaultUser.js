export const data = {
   name: "Tassk Manager",
   crtdAt: new Date().toLocaleString(),
   pall: null,
   tags: [],
   TGs: 
   [
      {
         taskGroupName: "New Task Group",
         iconPath: "./vectorGraphics/assStencil.svg",
         desc: null,
         tags: [],
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
               taskName: "New Task",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS",
               dueDate: null,
            },
            {
               taskName: "New Task",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS",
               dueDate: null,
            },
            {
               taskName: "New Task",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS",
               dueDate: null,
            },
            
         ]         
      },
      {
         taskGroupName: "New Task Group 2",
         iconPath: "./vectorGraphics/assStencil.svg",
         desc: 'The Second Task',
         tags: [],
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
         taskGroupName: "New Task Group 2",
         iconPath: "./vectorGraphics/assStencil.svg",
         desc: 'The Second Task',
         tags: [],
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
      savedColors: [],
      openTGs: 
      [
         'New Task Group', 'New Task Group 2',
      ]
   }
}