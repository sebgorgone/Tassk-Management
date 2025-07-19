export const data = {
   name: "Tassk Manager",
   crtdAt: null,
   pall: null,
   tags: [],
   tGs: 
   [
      {
         taskGroupName: "New Task Group",
         desc: null,
         tags: null,
         createdAt: new Date().toLocaleString(),
         tasks: 
         [
            {
               taskName: "New Task",
               createdAt: new Date().toLocaleString(),
               task: "DO THIS",
               dueDate: null,
            }
         ]         
      }
   ],
   defaults:
   {
      colorMode: 'light',
      savedColors: [],
      openTGs: 
      [
         'New Task Group',
      ]
   }
}