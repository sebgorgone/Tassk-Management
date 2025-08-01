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
      },
      {
         altLight: "#e0e3f4",
         bright: "#a3e6b8",
         dark: "#244a47",
         light: "#ddbdeb",
         name: "EVEBALLS 1",
         vibr: "#489986",
      },
      {
         altLight: "#DADAD9",
         birght: "#ff6464",
         dark: "#341342",
         light: "#8bc4e3",
         name: "SEBBALLS",
         vibr: "#9380e1"
      }
   ],
   TGs: 
   [
      {
         taskGroupName: "My Tasks",
         pall: null,
         iconPath: "./vectorGraphics/assStencil.svg",
         desc: 'the things im doing for this task group \n.1 thing \n2.things ',
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
   ],
   defaults:
   {
      openTGs: 
      [
         'My Tasks'
      ]
   }
}