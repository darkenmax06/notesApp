import { createContext, useState } from "react";

const initalNotes = [
  {
    id: 1,
    content: "hola pedro",
    createAt: "10/12/2012",
    colorData: {
      name: "lila",
      code: "#FA9696"
    }
  },{
    id: 2,
    content: "hola pedro",
    createAt: "12/12/2012",
    colorData: {
      name: "lila",
      code: "#FA9696"
    }
  },{
    id: 3,
    content: "hola pedro",
    createAt: "12/12/2012",
    colorData: {
      name: "lila",
      code: "#FA9696"
    }
  },{
    id: 4,
    content: "hola pedro",
    createAt: "12/12/2012",
    colorData: {
      name: "lila",
      code: "#FA9696"
    }
  }
]

export const noteContext = createContext()

function NoteContext({children}){
  const [notes,setNotes] = useState(null)

  const addNote = newNote => setNotes([newNote,...notes])

  const removeNote = noteId => {
    console.log(noteId)
    const filterNotes = notes.filter( note => note.noteId !== noteId)
    setNotes(filterNotes)
  }
  
  const changeNote = newValue => {
    const {noteId} = newValue
    const notesWithChanges = notes.map(note =>{
      if (note.noteId == noteId){
        return newValue
      } return note
    })
    setNotes(notesWithChanges)
  }

  const values = {
    notes,
    addNote,
    removeNote,
    changeNote,
    setNotes
  }

  return (
    <noteContext.Provider value={values}>
      {children}
    </noteContext.Provider>
  )
}

export default NoteContext