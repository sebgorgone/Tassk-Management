import { useState, useEffect } from "react";


function ColorEditor (props) {

   //state
   const [addNewPalletteField, setAddNewPalletteField] = useState(false)
   const [editPalletteField, setEditPalletteField] = useState(false)

   const [editedPallette, setEditedPallette] = useState(null);

   const [newPallName, setNewPallName] = useState('My New Pallette')
   const [newVibr, setNewVibr] = useState(props.sysPallette.vibr)   ;
   const [newBright, setNewBright] = useState(props.sysPallette.bright);
   const [newLight, setNewLight] = useState(props.sysPallette.light);
   const [newAltLight, setNewAltLight] = useState(props.sysPallette.altLight);
   const [newDark, setNewDark] = useState(props.sysPallette.dark);  

   const [newPallette, setNewPallette] = useState(null)
   const [revisedPallette, setRevisedPallette] = useState(null)

   const [editedIndex, setEditedIndex] = useState(null)

   const [revisedPallName, setRevisedPallName] = useState(null)   
   const [revisedVibr, setRevisedVibr] = useState(null)   
   const [revisedBright, setRevisedBright] = useState(null)
   const [revisedLight, setRevisedLight] = useState(null)
   const [revisedAltLight, setRevisedAltLight] = useState(null)   
   const [revisedDark, setRevisedDark] = useState(null)
   //effect

   useEffect(() => {
      if (newPallette === null) return
      props.create(newPallette);
      setNewPallName('My New Pallette');
      setNewVibr(props.sysPallette.vibr);
      setNewBright(props.sysPallette.bright);    
      setNewLight(props.sysPallette.light);
      setNewAltLight(props.sysPallette.altLight);
      setNewDark(props.sysPallette.dark);
      setAddNewPalletteField(false);
   }, [newPallette])

   useEffect(() => {
      if (editedPallette === null) return
      setRevisedPallName(editedPallette.name);               
      setRevisedVibr(editedPallette.vibr);
      setRevisedBright(editedPallette.bright);
      setRevisedLight(editedPallette.light);
      setRevisedAltLight(editedPallette.altLight);
      setRevisedDark(editedPallette.dark);
   }, [editedPallette])

   useEffect(() => {
      if (revisedPallette === null) return

      props.update(revisedPallette, editedIndex)

      setRevisedPallName(null);               
      setRevisedVibr(null);
      setRevisedBright(null);
      setRevisedLight(null);
      setRevisedAltLight(null);
      setRevisedDark(null);
      setEditedIndex

   }, [revisedPallette])

   return (<>
      <button style={{position: "absolute",right: 0, marginRight: "calc(2vw)", marginTop: ".5em", borderRadius: "1em", fontFamily: "fontss", fontSize: "calc(10px + 1vw)", color: props.sysPallette.bright, padding: ".25em", border: "solid"}} onClick={() => {setEditedPallette(null);setEditPalletteField(false); setAddNewPalletteField(true)}} className="taskGroupOptions">new palette</button>
      <div style={{display: "flex", justifyContent: "center", fontFamily: "fontss", color: props.sysPallette.light}}><h1>Color Palettes</h1></div>

      <div style={{display: "flex", height: "100%"}}>
         {/* saved palletts list */}
         <div style={{flex: 1, display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "center", color: props.sysPallette.altLight, fontFamily: "fontss"}}><h2>Saved Palettes</h2></div>
            
            {props.savedPallettes.map((p, index) => {
            return <div key={index} style={{display: 'flex', alignItems: 'center', color: "white", paddingLeft: ".4em"}}>-
               <button 
               type='button'
               onClick={() => {
                  setNewPallName('My New Pallette');
                  setEditedIndex(index)
                  setNewVibr(props.sysPallette.vibr);
                  setNewBright(props.sysPallette.bright);    
                  setNewLight(props.sysPallette.light);
                  setNewAltLight(props.sysPallette.altLight);
                  setNewDark(props.sysPallette.dark);
                  setAddNewPalletteField(false);
                  setEditedPallette(p);              
                  setEditPalletteField(true)
               }}
               style={{width: "45%", margin: ".3em", fontFamily: "fontss", borderRadius: ".5em", padding: ".2em",paddingBottom: "0", color: p.vibr, textAlign: "left", border: "none", display: "flex", justifyContent: "space-between", fontSize: "1em",height: "1.7em"}} className='colorPalletteList'>
                  {p.name}
                  <div style={{width: "20%", background: "grey", display: "flex", padding: ".15em", marginRight: ".5em", marginBottom: ".2em"}}>
                     <div style={{background: p.vibr, color: p.vibr, flex: 1}}></div>
                     <div style={{background: p.bright, color: p.bright, flex: 1}}></div>
                     <div style={{background: p.light, color: p.light, flex: 1}}></div>
                     <div style={{background: p.altLight, color: p.altLight, flex: 1}}></div>
                     <div style={{background: p.dark, color: p.dark, flex: 1}}></div>
                  </div>
               </button>
            </div>})}

         </div>

         {editPalletteField ? 
         // EDIT
            <div style={{flex: 1, fontFamily: "fontss", display: "flex", flexDirection: "column"}}>
               <div style={{display: "flex", justifyContent: "space-between", color: props.sysPallette.light}}>
                  <h1>Edit {editedPallette.name}</h1>
                  <button style={{height: "30%", alignSelf: "center", marginTop: "1.5em", border: "none", borderRadius: "1em", color: props.sysPallette.light, marginRight: "1em", padding: ".3em"}} type='button' className="taskOptions" onClick={() => {setEditPalletteField(false); setAddNewPalletteField(false); setEditedPallette(null)}}>cancel</button>
               </div>
               <input 
               style={{borderRadius: "1em", border: 'solid grey', textAlign: "center", fontFamily: "fontss", width: "50%", padding: ".4em", alignSelf: "center"}}
               value={revisedPallName}
               onChange={e => setRevisedPallName(e.target.value)}
               placeholder={editedPallette.name} 
               />

               <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Vibrant:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={revisedVibr}
                           type='color' 
                           onChange={(e) => setRevisedVibr(e.target.value)}
                           />
                  </div>

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Bright:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={revisedBright}
                           type='color' 
                           onChange={(e) => setRevisedBright(e.target.value)}
                           />
                  </div>

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Light:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={revisedLight}
                           type='color' 
                           onChange={(e) => setRevisedLight(e.target.value)}
                           />
                  </div>

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Alternative Light:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={revisedAltLight}
                           type='color' 
                           onChange={(e) => setRevisedAltLight(e.target.value)}
                           />
                  </div>

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Dark:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={revisedDark}
                           type='color' 
                           onChange={(e) => setRevisedDark(e.target.value)}
                           />
                  </div>

                  <div style={{ background: "grey", display: "flex", padding: ".35em", marginRight: ".5em", marginBottom: ".2em", height: "2.5em"}}>
                     <div style={{background: revisedVibr, color: props.sysPallette.vibr, flex: 1}}></div>
                     <div style={{background: revisedBright, color: props.sysPallette.bright, flex: 1}}></div>
                     <div style={{background: revisedLight, color: props.sysPallette.light, flex: 1}}></div>
                     <div style={{background: revisedAltLight, color: props.sysPallette.altLight, flex: 1}}></div>
                     <div style={{background: revisedDark, color: props.sysPallette.dark, flex: 1}}></div>
                  </div>

                  <div style={{display: "flex", justifyContent: "space-between", color: props.sysPallette.light}}>
                     <button style={{alignSelf: "center", width: "50%", marginTop: "1.5em", border: "none", borderRadius: "1em", color: props.sysPallette.light, marginRight: "1em", padding: ".3em"}} type='button' className="closeButton" onClick={() => {setRevisedPallette({
                        vibr: revisedVibr,
                        bright: revisedBright,
                        light: revisedLight,
                        altLight: revisedAltLight,
                        dark: revisedDark,
                        name: revisedPallName
                     }); setAddNewPalletteField(false); setEditedPallette(null); setEditPalletteField(null);}}>save</button>
                     <button style={{ alignSelf: "center", marginTop: "1.5em", border: "none", borderRadius: "1em", color: 'red', marginRight: "1em", padding: ".3em"}} type='button' className="taskOptions" onClick={() => {props.delete(editedIndex);setEditPalletteField(false); setAddNewPalletteField(false); setEditedPallette(null)}}>delete</button>
                  </div>
               
            </div>
          :
         //  CREATE
            <div style={{flex: 1, fontFamily: "fontss", paddingRight: ".5em"}}>
            {addNewPalletteField ? 
               <div style={{display: "flex", flexDirection: "column"}}>

                  <div style={{display: "flex", justifyContent: "space-between", color: props.sysPallette.light}}>
                     <h1>Create New Palette</h1>
                     <button style={{height: "30%", alignSelf: "center", marginTop: "1.5em", border: "none", borderRadius: ".6em", color: props.sysPallette.light, marginRight: "1em"}} type='button' className="taskOptions" onClick={() => {setEditPalletteField(false); setAddNewPalletteField(false)}}>cancel</button>
                  </div>

                  <input 
                  type='text'
                  style={{borderRadius: "1em", border: 'solid grey', textAlign: "center", fontFamily: "fontss", width: "50%", padding: ".4em", alignSelf: "center"}}
                  value={newPallName}
                  onChange={e => setNewPallName(e.target.value)}
                  />

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Vibrant:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={newVibr}
                           type='color' 
                           placeholder={newVibr}
                           onChange={(e) => setNewVibr(e.target.value)}
                           />
                  </div>

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Bright:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={newBright}
                           type='color' 
                           placeholder={newVibr}
                           onChange={(e) => setNewBright(e.target.value)}
                           />
                  </div>

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Light:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={newLight}
                           type='color' 
                           placeholder={newLight}
                           onChange={(e) => setNewLight(e.target.value)}
                           />
                  </div>

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Alternative Light:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={newAltLight}
                           type='color' 
                           placeholder={newVibr}
                           onChange={(e) => setNewAltLight(e.target.value)}
                           />
                  </div>

                  <div style={{display: "flex", color: props.sysPallette.light, margin: ".1em", alignItems: "center"}}>
                     <p>Dark:</p> 
                        <input 
                           style={{alignSelf: "center", margin: ".5em", cursor: "pointer", flex: 1}}
                           value={newDark}
                           type='color' 
                           placeholder={newDark}
                           onChange={(e) => setNewDark(e.target.value)}
                           />
                  </div>

                  <div style={{ background: "grey", display: "flex", padding: ".35em", marginRight: ".5em", marginBottom: ".2em", height: "2.5em"}}>
                     <div style={{background: newVibr, color: props.sysPallette.vibr, flex: 1}}></div>
                     <div style={{background: newBright, color: props.sysPallette.bright, flex: 1}}></div>
                     <div style={{background: newLight, color: props.sysPallette.light, flex: 1}}></div>
                     <div style={{background: newAltLight, color: props.sysPallette.altLight, flex: 1}}></div>
                     <div style={{background: newDark, color: props.sysPallette.dark, flex: 1}}></div>
                  </div>

                  <button
                  style={{width: "70%", alignSelf: "center", color: props.sysPallette.light, border: `.1em solid ${props.sysPallette.light}`, borderRadius: "1em", fontSize: "1.5em", margin: '.75em'}}
                  className="taskGroupButton"
                  onClick={e => {
                     e.preventDefault();
                     if (newPallName === '') return alert();
                     for (let p of props.savedPallettes){
                        if (p.name === newPallName) return alert('Pallette exists by that name')
                     }
                     setNewPallette({
                        vibr: newVibr,
                        birght: newBright,
                        light: newLight,
                        altLight: newAltLight,
                        dark: newDark,
                        name: newPallName
                     })
                  }}
                  >Create Palette</button>

               </div>
            : 
         // Landning
         <div style={{display: "flex"}}><p style={{color: props.sysPallette.altLight}}>Select a palette to edit <br /> or create a new one here →</p> <button style={{height: "30%", alignSelf: "center", marginTop: "1.5em", border: "none", borderRadius: ".6em", color: props.sysPallette.light, marginLeft: "1em", fontFamily: "fontss", fontSize: "1em"}} type='button' className="taskOptions" onClick={() => {setEditedPallette(null);setEditPalletteField(false); setAddNewPalletteField(true)}}>new palette</button></div>}
         </div>}

      </div>
   </>)
}

export default ColorEditor;